const { readFileSync, writeFileSync } = require("fs")
const { execSync } = require("child_process")

execSync("cargo build --target wasm32-unknown-unknown --release")
execSync("wasm-bindgen --out-dir build --target web target/wasm32-unknown-unknown/release/totp_wasm.wasm")
execSync("node_modules/.bin/wasm-opt -Os -o build/totp_wasm_bg.wasm build/totp_wasm_bg.wasm")

const wasm_data = readFileSync("build/totp_wasm_bg.wasm")
const deno_loader = `// @ts-nocheck\nexport default "${wasm_data.toString("base64")}";\n`;
writeFileSync("build/deno_data.js", deno_loader)
