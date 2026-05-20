import crypto from "crypto";

const privateKey = process.env.JENGA_PRIVATE_KEY_BASE64.replace(/\\n/g, "\n");
// Buffer.from(
//   process.env.JENGA_PRIVATE_KEY_BASE64,
//   "base64",
// ).toString("utf8");

export const allowedOrigins = [
  "http://localhost:4000",
  "http://localhost:5173",
  "https://jengatest.vercel.app",
  "https://uat.finserve.africa",
];

// console.log("Private Key:", privateKey);
export const sign = (params) => {
  // console.log(params);
  try {
    const signer = crypto.createSign("RSA-SHA256");

    signer.update(String(params));

    signer.end();

    const signature = signer.sign(privateKey, "base64");
    // console.log("SIGNATURE:", signature);
    return signature;
  } catch (error) {
    console.error(error);
  }
};
