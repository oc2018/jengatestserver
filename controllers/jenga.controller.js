import axios from "axios";
import env from "dotenv";
import crypto from "crypto";

env.config();

const merchantCode = process.env.JENGA_MERCHANT_CODE;
const consumerSecret = process.env.JENGA_CUSTOMER_SECRET;

export const getJengaToken = async (req, res) => {
  try {
    const payload = {
      merchantCode,
      consumerSecret,
    };

    const response = await axios.post(
      `${process.env.JENGA_API_AUTH_URL}/authenticate/merchant`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          "Api-Key": process.env.JENGA_API_KEY,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Token request failed", error.response?.data || error);
    res.status(500).json({ error: "Token request failed" });
  }
};

export const getRefreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  try {
    const response = await axios.post(
      `${process.env.JENGA_API_AUTH_URL}/authenticate/merchant`,
      refreshToken,
      {
        headers: {
          "Content-Type": "application/json",
          "Api-Key": process.env.JENGA_API_KEY,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Token refresh failed", error.response?.data || error);
    res.status(500).json({ error: "Token refresh failed" });
  }
};

export const getAccountBalance = async (req, res) => {
  const { countryCode, accountId } = req.body;
  const access_token = req.headers["authorization"].split(" ")[1];
  const privateKey = Buffer.from(
    process.env.JENGA_PRIVATE_KEY_BASE64,
    "base64"
  ).toString("utf8");

  console.log(privateKey);

  try {
    const sign = crypto.createSign("RSA-SHA256");
    sign.update(countryCode + accountId);
    sign.end();

    const signature = sign.sign(privateKey, "base64");
    const result = await axios.get(
      `${process.env.JENGA_ACCOUNT_API_URL}/accounts/balances/${countryCode}/${accountId}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          signature: signature,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(result.data);
    res.status(200).json(result.data);
  } catch (error) {
    console.log("Balance request failed", error.response?.data || error);
    res.status(500).json({ error: "Balance request failed" });
  }
};
