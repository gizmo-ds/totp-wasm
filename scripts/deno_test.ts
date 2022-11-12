import { assertEquals } from "https://deno.land/std@0.163.0/testing/asserts.ts";

import { hotp, totp, steam } from "../lib/deno/mod.ts";

const s2b = (s: string) => new TextEncoder().encode(s);

const test_key = "GM4VC2CQN5UGS33ZJJVWYUSFMQ4HOQJW";

Deno.test("HOTP test", () => {
  const code = hotp(s2b(test_key), 1662681600n, 6);
  assertEquals(code, "886679");
});

Deno.test("TOTP test", () => {
  const code = totp(test_key, 1662681600, 6, 30);
  assertEquals(code, "473526");
});

Deno.test("Steam test", () => {
  const code = steam(test_key, 1662681600);
  assertEquals(code, "4PRPM");
});
