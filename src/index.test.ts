import {guard, guardAsync, guardSync} from "./index";


test('guardAsync run as expected', async () => {
  const result = await guardAsync(Promise.resolve(1))
  expect(result.hasData()).toBe(true)
  expect(result.data).toBe(1)
  expect(result.error).toBeUndefined()

  const failedResult = await guardAsync(Promise.reject(new Error('error')))

  expect(failedResult.hasError()).toBe(true)
})

test('guardAsync with transform data', async () => {
  const result = await guardAsync(Promise.resolve(1), (data) => data + 1)
  expect(result.hasData()).toBe(true)
  expect(result.data).toBe(2)
  expect(result.error).toBeUndefined()

  const failedResult = await guardAsync(Promise.reject(new Error('error')))

  expect(failedResult.hasError()).toBe(true)
})

test('guardAsync run as expected', () => {
  const result = guardSync(() => 1)
  expect(result.hasData()).toBe(true)
  expect(result.data).toBe(1)
  expect(result.error).toBeUndefined()

  const failedResult = guardSync(() => { throw new Error('error') })

  expect(failedResult.hasError()).toBe(true)
})