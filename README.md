# Fork @kirz/nativewind-scale

## Window dimensions

`w-screen` and `h-screen` use the window width and height through NativeWind's
viewport units. `w-screen-x` and `h-screen-y` use the equivalent
`--screen-width` and `--screen-height` variables provided by `NativewindWrapper`.
All four update when the app window changes, including when the keyboard resizes it.
