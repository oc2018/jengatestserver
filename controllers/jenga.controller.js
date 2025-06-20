import axios from "axios";
import env from "dotenv";

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
    console.log(response.data);

    res.json(response.data);
  } catch (error) {
    console.error("Token request failed", error.response?.data || error);
    res.status(500).json({ error: "Token request failed" });
  }
};
