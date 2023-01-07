# totp-wasm

HOTP([RFC 4226](https://tools.ietf.org/html/rfc4226)) & TOTP([RFC 6238](https://tools.ietf.org/html/rfc6238)) & Steam Guard TOTP

## Demo

[https://totp-wasm.vercel.app](https://totp-wasm.vercel.app)

## Prerequisites

- [Rust](https://www.rust-lang.org)
- [Node.js](https://nodejs.org)

## Build

```bash
rustup target add wasm32-unknown-unknown
cargo install --version=0.2.83 wasm-bindgen-cli
pnpm install
node scripts/build.js
```

## Runing demo

```bash
cd website
pnpm install
pnpm dev
```

## License

Code is distributed under [MIT](./LICENSE) license, feel free to use it in your proprietary projects as well.
