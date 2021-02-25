export const clamp = (
  value: number,
  options: { min?: number; max?: number }
): number => {
  const { min = -Infinity, max = Infinity } = options;

  if (value < min) {
    return min;
  }

  if (value > max) {
    return max;
  }

  return value;
};
