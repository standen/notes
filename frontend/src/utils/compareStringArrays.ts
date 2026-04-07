export const compareStringArrays = (
  small: string[],
  big: string[],
): boolean => {
  return small.every((item) => big.includes(item));
};
