export { hotp, totp, steam } from "../../lib/totp_wasm";
import * as totp from "../../lib/totp_wasm";
import _wasmUrl from "../../lib/totp_wasm_bg.wasm?url";
export const wasmUrl = _wasmUrl;
export const init = totp.default;
