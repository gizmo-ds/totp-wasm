export { hotp, totp, steam_guard } from '../dist/totp_wasm.js'
import * as totp from '../dist/totp_wasm.js'
import data from '../dist/wasm_data.js'
export const init = totp.default
export const wasm_data = data
