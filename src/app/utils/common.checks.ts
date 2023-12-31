export function isUndefined(obj: any): boolean {
  return obj === undefined;
}

export function isNull(obj: any): boolean {
  return obj === null;
}

export function exists(obj: any): boolean {
  return !isUndefined(obj) && !isNull(obj);
}
