import { scaleVariables } from "./scale-variables";

export const getScaleVariableName = (value: string, num: number) => {
  const name = `var(--scale-${value})`;

  if (!scaleVariables[name]) {
    scaleVariables[name] = num;
  }

  return name;
};

export const scaleVar = (value: number) => {
  if (value.toString().includes(".")) {
    return getScaleVariableName(value.toString().split(".").join("_"), value);
  }

  return getScaleVariableName(value.toString(), value);
};
