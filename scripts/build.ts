import { base64Encode } from "../lib/deno/deps.ts";

await exec("cargo build --target wasm32-unknown-unknown --release");
await exec(
  "wasm-bindgen --out-dir ../lib --target web target/wasm32-unknown-unknown/release/totp_wasm.wasm"
);
await exec(`wasm-opt -Os -o lib/totp_wasm_bg.wasm lib/totp_wasm_bg.wasm`, ".");

const wasm_data = await Deno.readFile("lib/totp_wasm_bg.wasm");
const deno_loader = `// @ts-nocheck
// deno-fmt-ignore-file
// deno-lint-ignore-file
import { base64Decode } from "./deps.ts";
export { hotp, totp, steam } from "../totp_wasm.js";
import init from "../totp_wasm.js";
await init(base64Decode("${base64Encode(wasm_data)}"));
`;
await Deno.writeFile("lib/deno/mod.ts", new TextEncoder().encode(deno_loader));

async function exec(cmd: string, cwd = "totp-wasm") {
  await Deno.run({ cmd: cmd.split(" "), cwd }).status();
}
