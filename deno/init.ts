import { base64Decode } from "./deps.ts";
export { hotp, totp, steam } from "../build/totp_wasm.js";
import init from "../build/totp_wasm.js";
import code from "../build/deno_data.js";
await init(base64Decode(code));
