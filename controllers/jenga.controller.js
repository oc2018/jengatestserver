import axios from "axios";
import env from "dotenv";
import { sign } from "../utils/index.js";

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
      `${process.env.JENGA_API_AUTH_URL}/refresh`,
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

export const validateAccount = async (countryCode, accountId, access_token) => {
  const signature = sign(countryCode + accountId);

  const { data: inquiry } = await axios.get(
    `${process.env.JENGA_ACCOUNT_API_URL}/accounts/balances/${countryCode}/${accountId}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        signature: signature,
      },
    }
  );

  return inquiry;
};

export const getAccountBalance = async (req, res) => {
  const { countryCode, accountId } = req.body;

  const access_token = req.headers["authorization"].split(" ")[1];
  validateAccount(countryCode, accountId, access_token);

  if (!access_token) return res.status(403).json({ error: "Not authorized" });

  try {
    const signature = sign(countryCode + accountId);

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

    res.status(200).json(result.data);
  } catch (error) {
    console.log("Balance request failed", error.response?.data || error);
    res.status(500).json({ error: "Balance request failed" });
  }
};

export const getMiniStatement = async (req, res) => {
  const { countryCode, accountId } = req.body;

  try {
    const access_token = req.headers.authorization.split(" ")[1];

    if (!access_token)
      return res.status(403).json({ error: `Invalid or expired access token` });

    const signature = sign(countryCode + accountId);
    validateAccount(countryCode, accountId, access_token);

    const result = await axios.get(
      `${process.env.JENGA_ACCOUNT_API_URL}/accounts/miniStatement/${countryCode}/${accountId}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          signature: signature,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json(result.data);
  } catch (error) {
    console.log(`Mini statement query failed`, error.response?.data || error);
    res.status(500).json({ error: `Mini statement request failed` });
  }
};

export const getFullStatement = async (req, res) => {
  const { countryCode, accountNumber, fromDate, toDate } = req.body;

  try {
    const access_token = req.headers.authorization.split(" ")[1];

    const signature = sign(accountNumber + countryCode + toDate);

    const result = await axios.post(
      `${process.env.JENGA_ACCOUNT_API_URL}/accounts/fullStatement`,
      {
        countryCode,
        accountNumber,
        fromDate,
        toDate,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          Signature: signature,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json(result.data);
  } catch (error) {
    console.log("Get full statement failed", {
      error: error.response.data || error,
    });
    res.status(500).json({ error: `Statement request failed` });
  }
};

export const sendMoneyMobile = async (req, res) => {
  const { source, destination, transfer } = req.body;

  const access_token = req.headers.authorization.split(" ")[1];

  try {
    const signature = sign(
      transfer.amount +
        transfer.currencyCode +
        transfer.reference +
        source.accountNumber
    );

    const result = await axios.post(
      `${process.env.JENGA_TRANSACTION_API_URL}/remittance/sendmobile`,
      { source, destination, transfer },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          signature: signature,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json(result.data);
  } catch (error) {
    console.log("Send money failed", error.response?.data || error);
    res.status(500).json({ error: `Send money failed` });
  }
};

export const queryStatus = async (req, res) => {
  const { reference } = req.body;
  const access_token = req.headers.authorization.split(" ")[1];
  const url = `${process.env.JENGA_TRANSACTION_API_URL}/transactions/details/${reference}`;

  try {
    const signature = sign(reference);

    const result = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        signature,
      },
    });

    // console.log(result.data);

    res.status(200).json(result.data);
  } catch (error) {
    console.log("Transaction status query failed", error);
    res.status(500).json({ error: `Transaction status query failed` });
  }
};

export const pesaLinkMobile = async (req, res) => {
  const { source, destination, transfer } = req.body;

  const access_token = req.headers.authorization.split(" ")[1];
  const signature = sign(
    transfer.amount +
      transfer.currencyCode +
      transfer.reference +
      destination.name +
      source.accountNumber
  );

  // console.log(access_token);

  try {
    const result = await axios.post(
      `${process.env.JENGA_TRANSACTION_API_URL}/remittance/pesalinkMobile`,
      { source, destination, transfer },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          signature: signature,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json(result.data);
  } catch (error) {
    if (error.response?.data.code === 104201) {
      return res.status(503).json({
        error: "Transaction temporarily unavailable. please try again later",
        reference: error.response.data.reference,
      });
    }
    console.log("Pesalink to mobile failed", error.response.data || error);
    res.status(500).json({ error: "Pesalink to mobile failed" });
  }
};

export const pesaLinkToBank = async (req, res) => {
  const { source, destination, transfer } = req.body;

  const access_token = req.headers.authorization.split(" ")[1];

  const signature = sign(
    transfer.amount +
      transfer.currencyCode +
      transfer.reference +
      destination.name +
      source.accountNumber
  );

  try {
    const result = await axios.post(
      `${process.env.JENGA_TRANSACTION_API_URL}/remittance/pesalinkacc`,
      { source, destination, transfer },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          signature: signature,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json(result.data);
  } catch (error) {
    console.log("Pesalink to bank failed", error.response.data || error);
    res.status(500).json({ error: `Pesalink to bank failed` });
  }
};
