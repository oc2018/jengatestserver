import crypto from "crypto";
const privateKey = Buffer.from(
  process.env.JENGA_PRIVATE_KEY_BASE64,
  "base64"
).toString("utf8");

export const allowedOrigins = [
  "http://localhost:4000",
  "http://localhost:5173",
  "https://jengatest.vercel.app",
  "https://uat.finserve.africa",
];

export const sign = (params) => {
  const sign = crypto.createSign("RSA-SHA256");

  sign.update(params);

  sign.end();

  const signature = sign.sign(privateKey, "base64");

  return signature;
};
