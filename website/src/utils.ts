const RFC4648_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

export function generateSecret(length: number = 32) {
  const result = new Array(length);
  for (let i = 0; i < length; i++)
    result[i] = RFC4648_ALPHABET[randomInt(0, RFC4648_ALPHABET.length - 1)];
  return result.join("");
}

export function randomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
