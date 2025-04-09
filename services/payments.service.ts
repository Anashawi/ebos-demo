import {} from "../models/payments";
const axios = require("axios");

const MID = process.env.MID;
const API_PASSWORD = process.env.API_PASSWORD;
const API_OPERATION = process.env.API_OPERATION;

export async function createSession(id: string) {
  try {
    const paymentPayload = {
      apiOperation: "INITIATE_CHECKOUT",
      interaction: {
        operation: API_OPERATION,
        merchant: {
          name: "Ammar Mango",
        },
        returnUrl: `http://localhost:3000/org/roadmap?result=SUCCESS&orderId=${id}`,
        cancelUrl: `http://localhost:3000/org/roadmap?result=CANCELLED&orderId=${id}`,
      },
      order: {
        currency: "USD",
        amount: 70.0,
        id: id,
        description: "Ebos Platform",
      },
    };

    const mastercardApiUrl = `https://mepspay.gateway.mastercard.com/api/rest/version/100/merchant/${MID}/session`; // Verify if version 100 is correct

    // Make the external API call using Axios
    const authString = `merchant.${MID}:${API_PASSWORD}`;
    const base64Auth = Buffer.from(authString).toString("base64");

    // Set headers for the request
    const headers = {
      "Content-Type": "application/json", // Corrected Content-Type
      Authorization: `Basic ${base64Auth}`,
    };
    const mastercardApiResponse = await axios.post(
      mastercardApiUrl,
      paymentPayload,
      {
        headers,
      }
    );
    return mastercardApiResponse;
  } catch (error) {
    console.log(error);
  }
}

export async function checkPaymentStatus(orderId: string) {
  try {
    if (!MID || !API_PASSWORD) {
      console.error("MID or API_PASSWORD not configured.");
      return {
        status: 500,
        data: { message: "Merchant credentials not configured." },
      };
    }

    // Mastercard API endpoint for checking transaction by order ID
    const apiUrl = `https://mepspay.gateway.mastercard.com/api/rest/version/100/merchant/${MID}/order/${orderId}`;

    const authString = `merchant.${MID}:${API_PASSWORD}`;
    const base64Auth = Buffer.from(authString).toString("base64");

    // Set headers for the request
    const headers = {
      "Content-Type": "application/json", // Corrected Content-Type
      Authorization: `Basic ${base64Auth}`,
    };
    const response = await axios.get(apiUrl, { headers });

    // Inspect and extract relevant status info
    const transactionStatus = response.data?.result || response.data?.status;

    return {
      status: response.status,
      data: {
        status: transactionStatus,
        rawResponse: response.data,
      },
    };
  } catch (error: any) {
    console.error("Error checking payment status:", error);
    return {
      status: error.response?.status || 500,
      data: {
        message: "Failed to retrieve payment status from gateway.",
        error: error.response?.data,
      },
    };
  }
}
