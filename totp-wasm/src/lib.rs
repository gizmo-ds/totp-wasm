#![allow(non_upper_case_globals)]
extern crate wasm_bindgen;

use base32::decode;
use base32::Alphabet::RFC4648;
use hmac::{Hmac, Mac};
use wasm_bindgen::prelude::*;

type HmacSha1 = Hmac<sha1::Sha1>;

const STEAM_CHARS: &[u8; 26] = b"23456789BCDFGHJKMNPQRTVWXY";

#[wasm_bindgen]
pub fn hotp(k: &[u8], c: u64, digits: usize) -> String {
  let mut h = HmacSha1::new_from_slice(k).unwrap();
  h.update(&c.to_be_bytes());

  let hash = h.finalize().into_bytes();

  let offset = (hash[hash.len() - 1] & 0xf) as usize;
  let bytes: [u8; 4] = hash[offset..offset + 4].try_into().unwrap();

  let result = u32::from_be_bytes(bytes) & 0x7FFFFFFF;

  let code = result % (10_u32.pow(digits as u32));
  let code = format!("{:0>width$}", code, width = digits);
  code
}

#[wasm_bindgen]
pub fn totp(secret: &str, t: f64, digits: usize, tc: i32) -> String {
  let c = (t / (tc as f64)).floor() as u64;
  let k = decode(RFC4648 { padding: true }, secret).unwrap();
  hotp(&k, c, digits)
}

#[wasm_bindgen]
pub fn steam(secret: &str, t: f64) -> String {
  let c = (t / (30 as f64)).floor() as u64;
  let k = decode(RFC4648 { padding: true }, secret).unwrap();

  let mut h = HmacSha1::new_from_slice(&k).unwrap();
  h.update(&c.to_be_bytes());

  let hash = h.finalize().into_bytes();

  let offset = (hash[hash.len() - 1] & 0xf) as usize;
  let bytes: [u8; 4] = hash[offset..offset + 4].try_into().unwrap();

  let result = u32::from_be_bytes(bytes) & 0x7FFFFFFF;

  let mut fc = result;

  let mut code: [u8; 5] = [0; 5];
  for i in 0..5 {
    let v = STEAM_CHARS[(fc % (STEAM_CHARS.len() as u32)) as usize];
    code[i as usize] = v;
    fc /= STEAM_CHARS.len() as u32;
  }

  String::from_utf8_lossy(&code).to_string()
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn test_hotp() {
    let code = hotp(b"GM4VC2CQN5UGS33ZJJVWYUSFMQ4HOQJW", 1662681600, 6);
    assert_eq!(code, "886679");
  }

  #[test]
  fn test_totp() {
    let code = totp("GM4VC2CQN5UGS33ZJJVWYUSFMQ4HOQJW", 1662681600 as f64, 6, 30);
    assert_eq!(code, "473526");
  }

  #[test]
  fn test_steam() {
    let code = steam("GM4VC2CQN5UGS33ZJJVWYUSFMQ4HOQJW", 1662681600 as f64);
    assert_eq!(code, "4PRPM");
  }
}
