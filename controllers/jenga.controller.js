import axios from "axios";

const merchantCode = process.env.VITE_JENGA_MERCHANT_CODE;
const consumerSecret = process.env.VITE_JENGA_CUSTOMER_SECRET;

export const getJengaToken = async (req, res) => {
  try {
    const formData = new URLSearchParams();

    formData.append("merchantCode", merchantCode);
    formData.append("consumerSecret", consumerSecret);

    const response = await axios.post(
      process.env.VITE_JENGA_API_AUTH_URL,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          "Api-key": process.env.VITE_JENGA_API_KEY,
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
