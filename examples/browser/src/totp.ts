export { hotp, totp, steam, init } from '../../../packages/totp-wasm'
import _wasm_url from '../../../packages/totp-wasm/dist/totp_wasm_bg.wasm?url'
export const wasm_url = _wasm_url
