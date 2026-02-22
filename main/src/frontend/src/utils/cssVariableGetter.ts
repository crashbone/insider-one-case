const styles = getComputedStyle(document.documentElement);
export function getInt(name: string): number {
  return parseInt(styles.getPropertyValue(name).trim());
}