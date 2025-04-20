import { Payment, IPayment } from "../models/payments";
const axios = require("axios");
import { dbConnect } from "./db.service";

const MID = process.env.MID;
const API_PASSWORD = process.env.API_PASSWORD;
const API_OPERATION = process.env.API_OPERATION;

export async function createSession(orderId: string, amount: number) {
  try {
    const paymentPayload = {
      apiOperation: "INITIATE_CHECKOUT",
      interaction: {
        operation: API_OPERATION,
        merchant: {
          name: "Ammar Mango",
        },
        returnUrl: `http://localhost:3000/org/roadmap?result=SUCCESS&orderId=${orderId}`,
        cancelUrl: `http://localhost:3000/org/roadmap?result=CANCELLED&orderId=${orderId}`,
      },
      order: {
        currency: "USD",
        amount: amount,
        id: orderId,
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

export async function getAll(query?: { searchText?: any }) {
  try {
    await dbConnect();
    let result;
    if (query && !!Object.keys(query).length) {
      result = await Payment.find({ fullName: { $regex: query.searchText } });
    } else {
      result = await Payment.find();
    }
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function insertOne(payment: IPayment) {
  try {
    await dbConnect();
    //@ts-ignore
    const newPayment = new Payment(payment);
    await newPayment.save();
    return newPayment?.toJSON();
  } catch (error) {
    console.log(error);
  }
}

export async function deleteOne(id: string) {
  try {
    await dbConnect();
    const deleteSubscriber = await Payment.findByIdAndDelete(id);
    return deleteSubscriber?.toJSON();
  } catch (error) {
    console.log(error);
  }
}
