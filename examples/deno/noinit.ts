import { init } from "./deps.ts";
export { hotp, totp, steam_guard } from './deps.ts'
export const loadAndInit = (data: Uint8Array | string) => init(data)
