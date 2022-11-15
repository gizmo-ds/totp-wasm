export {
  decode as base64Decode,
  encode as base64Encode,
} from "https://deno.land/std@0.163.0/encoding/base64.ts";

export { assertEquals } from "https://deno.land/std@0.163.0/testing/asserts.ts";

export const exec = async (cmd: string) =>
  await Deno.run({ cmd: cmd.split(" ") }).status();
