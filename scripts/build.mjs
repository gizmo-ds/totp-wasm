import { readFileSync, writeFileSync, rmSync } from 'fs'
import { execSync } from 'child_process'

const out_dir = 'packages/totp-wasm/dist'
rmSync(out_dir, { recursive: true, force: true })
execSync('cargo build --target wasm32-unknown-unknown --release')
execSync(
  `wasm-bindgen --out-dir ${out_dir} --target web target/wasm32-unknown-unknown/release/totp_wasm.wasm`
)
execSync(
  `node_modules/.bin/wasm-opt -Os --strip-debug --strip-producers --zero-filled-memory -o ${out_dir}/totp_wasm_bg.wasm ${out_dir}/totp_wasm_bg.wasm`
)

const wasm_file = `${out_dir}/totp_wasm_bg.wasm`
const wasm_data = readFileSync(wasm_file).toString('base64')
const deno_loader = `// @ts-nocheck
export default "${wasm_data}";
`
writeFileSync(`${out_dir}/wasm_data.js`, deno_loader)
