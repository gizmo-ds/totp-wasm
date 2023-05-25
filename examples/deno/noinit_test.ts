import { assertEquals } from './deps.ts'
import { loadAndInit, hotp, totp, steam_guard } from './noinit.ts'

const s2b = (s: string) => new TextEncoder().encode(s)

const test_key = 'GM4VC2CQN5UGS33ZJJVWYUSFMQ4HOQJW'

Deno.test('WASM noinit', async (t) => {
  await loadAndInit(
    await Deno.readFile('packages/totp-wasm/dist/totp_wasm_bg.wasm')
  )

  await t.step('HOTP', () => {
    const code = hotp(s2b(test_key), 1662681600n, 6)
    assertEquals(code, '886679')
  })

  await t.step('TOTP', () => {
    const code = totp(test_key, 1662681600, 6, 30)
    assertEquals(code, '473526')
  })

  await t.step('Steam Guard', () => {
    const code = steam_guard(test_key, 1662681600)
    assertEquals(code, '4PRPM')
  })
})
