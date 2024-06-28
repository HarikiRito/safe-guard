type TransformFn<D, T> = (data: D) => T

export class SafeData<Data> {
  data?: Data
  error?: Error

  hasError(): this is { data?: Data; error: Error } {
    return !!this.error
  }

  hasData(): this is { data: Data; error?: Error } {
    return !this.hasError()
  }
}

export async function guard<D, T extends any = D>(func: Promise<D> | (() => D), transformFunc?: TransformFn<D, T>) {
  if (func instanceof Promise) {
    return guardAsync(func, transformFunc)
  }
  return guardSync(func, transformFunc)
}

export function guardSync<D, T extends unknown = D>(func: () => D, transformFunc?: TransformFn<D, T>) {
  const safeData = new SafeData<T>()
  try {
    const data = func() as Awaited<D>
    safeData.data = transformFunc?.(data) ?? (data as T)
  } catch (error) {
    safeData.error = error as Error
  }
  return safeData
}

export async function guardAsync<D, T extends unknown = D>(func: Promise<D>, transformFunc?: TransformFn<D, T>) {
  const safeData = new SafeData<T>()
  try {
    const data = await func
    safeData.data = transformFunc?.(data) ?? (data as T)
  } catch (error) {
    safeData.error = error as Error
  }
  return safeData
}
