import init from "../build/totp_wasm.js";
export { hotp, totp, steam } from "../build/totp_wasm.js";
export const loadAndInit = (data: Uint8Array | string) => init(data);
