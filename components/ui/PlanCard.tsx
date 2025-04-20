import { CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../components/ui/dialog";

import { v4 as uuidv4 } from "uuid";
import { createSession } from "../../http-client/payments";
import { useRouter } from "next/router";

import React, { useEffect } from "react";

const PlanCard = ({
  title,
  subtitle,
  items,
  price,
  buttonLabel,
}: {
  title: React.ReactNode;
  subtitle?: string;
  items: React.ReactNode[];
  price: string;
  buttonLabel: string;
}) => {
  const handlePayment = () => {
    // TODO: Add your payment logic here
    handlePaymentPage();
  };
  const successPayment = async () => {
    const orderId = uuidv4();

    let amount;
    switch (price) {
      case "99$ one-time payment to generate report":
        amount = 99;
        break;
      case "499$ one-time payment":
        amount = 499;
        break;
      case "1999$ one-time payment":
        amount = 1999;
        break;
      default:
        console.warn("Unknown price selected");
        return;
    }
    const result = await createSession({ amount, orderId });
    return result.session.id;
  };

  const handlePaymentPage = async () => {
    const sessionId = await successPayment();
    await initializeScript();
    try {
      if (sessionId) {
        //@ts-ignore
        const checkoutInstance = window.Checkout;

        checkoutInstance.configure({
          session: {
            id: sessionId,
          },
        });

        checkoutInstance.showPaymentPage();
      } else {
        console.error("Checkout is not available.");
        alert("Payment service is unavailable. Please try again later.");
      }
    } catch (error) {
      console.error("Error in handlePaymentPage:", error);
      alert("Failed to initiate payment. Please try again.");
    }
  };
  const initializeScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src =
        "https://mepspay.gateway.mastercard.com/static/checkout/checkout.min.js";

      script.onload = () => {
        console.log(script);
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="bg-[#f8f9f9] rounded-3xl shadow-sm p-8 flex flex-col justify-between w-full max-w-sm mx-auto cursor-pointer hover:shadow-md transition">
          <div>
            <h2 className="text-2xl font-extrabold text-[#1a3365]">{title}</h2>
            {subtitle && (
              <p className="text-green-600 text-sm font-semibold mt-1">
                {subtitle}
              </p>
            )}
            <ul className="mt-4 space-y-4 text-gray-800">
              {items.map((item, idx) => (
                <li key={idx} className="flex gap-3 items-start">
                  <CheckCircle2 className="text-green-500 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm mt-2">{price}</p>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {subtitle && <DialogDescription>{subtitle}</DialogDescription>}
        </DialogHeader>
        <ul className="mt-6 space-y-4 text-gray-800">
          {items.map((item, idx) => (
            <li key={idx} className="flex gap-3 items-start">
              <CheckCircle2 className="text-green-500 mt-1" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 text-center">
          <button
            onClick={handlePayment}
            className="bg-[#1a3365] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#13264d] transition"
          >
            {buttonLabel}
          </button>
          <p className="text-gray-600 text-sm mt-2">{price}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlanCard;
