import { init, hotp, totp, steam } from '../../packages/totp-wasm'
import { readFileSync } from 'node:fs'
import { equal } from 'node:assert'

const wasm_data = new Uint8Array(
  readFileSync('../../packages/totp-wasm/dist/totp_wasm_bg.wasm').buffer
)
const s2b = (s: string) => new TextEncoder().encode(s)

const test_key = 'GM4VC2CQN5UGS33ZJJVWYUSFMQ4HOQJW'
const test_t = 1662681600

;(async () => {
  await init(wasm_data)

  equal(hotp(s2b(test_key), BigInt(test_t), 6), '886679')
  equal(totp(test_key, test_t, 6, 30), '473526')
  equal(steam(test_key, test_t), '4PRPM')
})()
