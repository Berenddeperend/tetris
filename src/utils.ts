export function uniq(arr:any[]):any[] {
  return [...new Set(arr)];
}

export function cloneDeep(o):any {
  return JSON.parse(JSON.stringify(o));
}