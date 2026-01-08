import { vars } from 'nativewind';
import { PropsWithChildren, useMemo, useState, useEffect } from 'react';
import { Dimensions, ScaledSize, View } from 'react-native';

import { scale, ScaleReference } from './scale';
import { Config } from 'tailwindcss';
import { scaleVariables } from './scale-variables';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type NativeWindWrapperProps = PropsWithChildren<{
    config: Config;
}>;

export function NativewindWrapper({ children, config }: NativeWindWrapperProps) {
    const [dimensions, setDimensions] = useState({
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
    });

    const insets = useSafeAreaInsets();
    const variables = useMemo(() => {
        return Object.entries(scaleVariables).map(([key, value]) => {
            const name = key.replace('var(--scale-', '').replace(')', '');

            if (name.startsWith('y')) {
                return [`--scale-${name}`, scale(value)] as const;
            }

            return [`--scale-${name}`, scale(value)] as const;
        });
    }, [config]);

    useEffect(() => {
        ScaleReference.isTablet = config.isTablet ?? false;
    }, [config.isTablet]);

    useEffect(() => {
        const onChange = ({ screen }: { screen: ScaledSize }) => setDimensions(screen);

        const subscription = Dimensions.addEventListener('change', onChange);
        return () => subscription?.remove();
    }, []);

    return (
        <View
            style={[
                { flex: 1 },
                vars({
                    ...Object.fromEntries(variables),
                    '--screen-width': dimensions.width,
                    '--screen-height': dimensions.height,
                    '--edge-t': insets.top,
                    '--edge-b': insets.bottom,
                    '--edge-l': insets.left,
                    '--edge-r': insets.right,
                }),
            ]}
        >
            {children}
        </View>
    );
}
