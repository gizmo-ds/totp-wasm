export { hotp, totp, steam } from './dist/totp_wasm'
import * as totp from './dist/totp_wasm'
export const init = totp.default
