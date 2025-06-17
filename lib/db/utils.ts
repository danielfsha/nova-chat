import "dotenv/config";

import crypto from "crypto";

if (!process.env.BYOK_API_ENCRYPTION_KEY) {
  throw new Error("BYOK_API_ENCRYPTION_KEY environment variable is not set");
}

// BYOK API Key Encryption
const algorithm = "aes-256-cbc";
const key = crypto.scryptSync(process.env.BYOK_API_ENCRYPTION_KEY!, "salt", 32); // 32 bytes key
const ivLength = 16; // AES block size

export function encryptApiKey(apiKey: string): string {
  const iv = crypto.randomBytes(ivLength);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(apiKey, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted; // store IV with ciphertext
}

export function decryptApiKey(encrypted: string): string {
  const [ivHex, encryptedData] = encrypted.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
