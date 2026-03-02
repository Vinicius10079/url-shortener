import Hashids from "hashids";

const SALT =
  process.env.HASH_SALT || "dev-salt-change-in-production";

/**
 * Configuração:
 * - mínimo 6 caracteres
 * - alfabeto base62
 */
const hashids = new Hashids(
  SALT,
  6,
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
);

export function encodeId(id: bigint | number): string {
  return hashids.encode(Number(id));
}

export function decodeCode(code: string): number[] {
  return hashids.decode(code).map((v) => Number(v));
}