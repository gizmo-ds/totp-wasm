import { base64Encode, exec } from "../deno/deps.ts";

for (const cmd of [
  "cargo build --target wasm32-unknown-unknown --release",
  "wasm-bindgen --out-dir build --target web target/wasm32-unknown-unknown/release/totp_wasm.wasm",
  "wasm-opt -Os -o build/totp_wasm_bg.wasm build/totp_wasm_bg.wasm",
])
  await exec(cmd);

const wasm_data = await Deno.readFile("build/totp_wasm_bg.wasm");
const deno_loader = `// @ts-nocheck
export default "${base64Encode(wasm_data)}";
`;
await Deno.writeFile(
  "build/deno_data.js",
  new TextEncoder().encode(deno_loader)
);
