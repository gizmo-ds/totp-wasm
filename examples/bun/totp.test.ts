import { expect, test } from 'bun:test'
import {
  init,
  wasm_data,
  hotp,
  totp,
  steam_guard,
} from '../../packages/totp-wasm'

const s2b = (s: string) => new TextEncoder().encode(s)

const test_key = 'GM4VC2CQN5UGS33ZJJVWYUSFMQ4HOQJW'

test('HOTP', async () => {
  await init(Buffer.from(wasm_data, 'base64'))
  const code = hotp(s2b(test_key), 1662681600n, 6)
  expect(code).toBe('886679')
})

test('TOTP', async () => {
  await init(Buffer.from(wasm_data, 'base64'))
  const code = totp(test_key, 1662681600, 6, 30)
  expect(code).toBe('473526')
})

test('Steam Guard', async () => {
  await init(Buffer.from(wasm_data, 'base64'))
  const code = steam_guard(test_key, 1662681600)
  expect(code).toBe('4PRPM')
})
