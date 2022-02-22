/**
 * Joins multiple strings with an space in the middle. Mostly usses for css class names
 * @param classes
 * @returns the joined strings
 */
const classNames = (...classes: string[]): string => {
  return classes.filter(Boolean).join(' ')
}

export { classNames }
