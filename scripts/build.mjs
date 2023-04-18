import { readFileSync, writeFileSync } from 'fs'
import { execSync } from 'child_process'

const out_dir = 'packages/totp-wasm/dist'
execSync('cargo build --target wasm32-unknown-unknown --release')
execSync(
  `wasm-bindgen --out-dir ${out_dir} --target web target/wasm32-unknown-unknown/release/totp_wasm.wasm`
)
execSync(
  `node_modules/.bin/wasm-opt -Os -o ${out_dir}/totp_wasm_bg.wasm ${out_dir}/totp_wasm_bg.wasm`
)

const wasm_file = `${out_dir}/totp_wasm_bg.wasm`
const wasm_data = readFileSync(wasm_file).toString('base64')
const deno_loader = `// @ts-nocheck\nexport default "${wasm_data}";\n`
writeFileSync(`${out_dir}/wasm_data.js`, deno_loader)
