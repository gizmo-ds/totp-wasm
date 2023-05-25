# totp-wasm

HOTP([RFC 4226](https://tools.ietf.org/html/rfc4226)) & TOTP([RFC 6238](https://tools.ietf.org/html/rfc6238)) & Steam Guard TOTP

## Demo

[https://totp-wasm.vercel.app](https://totp-wasm.vercel.app)

## Prerequisites

- [Rust](https://www.rust-lang.org)
- [Node.js](https://nodejs.org)

## Usage

### Deno

```typescript
import {
  totp,
  init,
  wasm_data,
} from 'https://deno.land/x/totp_wasm/deno/mod.ts'

await init(wasm_data)
const code = totp('GM4VC2CQN5UGS33ZJJVWYUSFMQ4HOQJW', 1662681600, 6, 30)
console.log(code)
// 473526
```

### Browser

[example](./examples/browser)

### Node.js

[example](./examples/node)

## Build

```bash
rustup target add wasm32-unknown-unknown
cargo install --version=0.2.83 wasm-bindgen-cli
pnpm install
node scripts/build.mjs
```

## Runing examples

```bash
cd examples/browser
pnpm install
pnpm dev
```

# Related Projects

Here are some related projects that you may find useful:

- [totp-wasm-zig](https://github.com/gizmo-ds/totp-wasm-zig): Zig implementation of this project.
- [UdonOTPLib](https://github.com/gizmo-ds/UdonOTPLib): C# implementation for the VRChat game.

## License

Code is distributed under [MIT](./LICENSE) license, feel free to use it in your proprietary projects as well.
