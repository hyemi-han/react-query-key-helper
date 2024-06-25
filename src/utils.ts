export const isNonNil = <T>(value: T | null | undefined): value is T => {
  return typeof value !== "undefined" && value !== null;
};
