export { hotp, totp, steam } from "../../build/totp_wasm";
import * as totp from "../../build/totp_wasm";
import _wasmUrl from "../../build/totp_wasm_bg.wasm?url";
export const wasmUrl = _wasmUrl;
export const init = totp.default;
