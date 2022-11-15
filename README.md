# totp-wasm

HOTP([RFC 4226](https://tools.ietf.org/html/rfc4226)) & TOTP([RFC 6238](https://tools.ietf.org/html/rfc6238)) & Steam Guard TOTP

## Demo

[https://totp-wasm.vercel.app](https://totp-wasm.vercel.app)

## Prerequisites

- [Rust](https://www.rust-lang.org)
- [Deno](https://deno.land)
- [wasm-bindgen-cli](https://rustwasm.github.io/wasm-bindgen/reference/cli.html)
- [Binaryen](https://github.com/webassembly/binaryen)
- \*[Node.js](https://nodejs.org) (Demo website)
- \*[pnpm](https://pnpm.io) (Demo website)

## Build

```bash
deno run -A scripts/build.ts
```

## Runing demo

```bash
cd website
pnpm install
pnpm dev
```

## License

Code is distributed under [MIT](./LICENSE) license, feel free to use it in your proprietary projects as well.
