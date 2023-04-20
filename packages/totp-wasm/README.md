# totp-wasm

HOTP([RFC 4226](https://tools.ietf.org/html/rfc4226)) & TOTP([RFC 6238](https://tools.ietf.org/html/rfc6238)) & Steam Guard TOTP

## Demo

[https://totp-wasm.vercel.app](https://totp-wasm.vercel.app)

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

## License

Code is distributed under [MIT](https://github.com/gizmo-ds/totp-wasm/blob/main/LICENSE) license, feel free to use it in your proprietary projects as well.
