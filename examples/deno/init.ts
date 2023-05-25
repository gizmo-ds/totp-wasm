import { base64Decode, init, wasm_data } from './deps.ts'
export { hotp, totp, steam_guard } from './deps.ts'
await init(base64Decode(wasm_data))
