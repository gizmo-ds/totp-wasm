await exec("cargo build --target wasm32-unknown-unknown --release");
await exec(
  "wasm-bindgen --out-dir ../website/src/totp --target web target/wasm32-unknown-unknown/release/totp_wasm.wasm"
);

const wasm_file = "website/src/totp/totp_wasm_bg.wasm";
await exec(`wasm-opt -Os -o ${wasm_file} ${wasm_file}`, "./");

async function exec(cmd: string, cwd = "totp-wasm") {
  await Deno.run({ cmd: cmd.split(" "), cwd }).status();
}