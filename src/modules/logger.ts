export function log(...args: any[]) {
  console.log(...args);
}

export function tryCatch<T>(tryFunc: () => T, catchFunc?: (reason: any) => any): T {
  try {
    const result = tryFunc();
    if (result instanceof Promise) {
      return (result.then().catch((err) => catchFunc && catchFunc(err)) as any) as T;
    }
    return result;
  } catch (err) {
    if (catchFunc) catchFunc(err);
    return void 0;
  }
}
