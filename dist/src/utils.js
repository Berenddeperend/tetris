export function uniq(arr) {
  return [...new Set(arr)];
}
export function cloneDeep(o) {
  return JSON.parse(JSON.stringify(o));
}
