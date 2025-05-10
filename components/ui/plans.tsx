import React, { useState } from "react";
import PlanCard from "./PlanCard"; // Make sure path is correct

const Plans = ({
  isOpen,
  closePlans,
}: {
  isOpen: boolean;
  closePlans: () => void;
}) => {
  const [isGenerateReportOpen, setIsGenerateReportOpen] = useState(false); // New state for second dialog

  if (!isOpen) return null; // Don't render the dialog if not open

  return (
    <div className="fixed inset-0  bg-black bg-opacity-50 flex justify-center items-center z-50">
      <section className="bg-white py-16  px-4 flex flex-col justify-center items-center text-center w-[1000px] max-h-[98vh] overflow-y-auto rounded-3xl shadow-xl">
        <h1 className="text-4xl font-extrabold text-[#1a3365] mt-20">
          <span className="text-[#1a3365]">Choose Your Plan</span>
        </h1>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-4">
          {plansDetails.map((item, index) => (
            <PlanCard
              key={index}
              title={item.title}
              subtitle={item.subtitle}
              items={item.items}
              buyNow={item.buyNow}
              price={item.price}
              buttonLabel={item.buttonLabel}
            />
          ))}
        </div>
        <div className="bg-[#1a3365] text-white py-10 px-6 rounded-3xl max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 mt-6">
          <div className="text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              EBOSS <span className="text-yellow-400">Enterprise</span>
            </h2>
            <p className="text-yellow-400 font-semibold text-lg mt-2">
              Build your Ultimate Growth Strategy Hand in hand with EBOSS
              Experts.
            </p>
          </div>
          <p className="bg-yellow-400 text-[#1a3365] font-bold px-8 py-3 rounded-full">
            EBOSS
          </p>
        </div>
        <button
          onClick={closePlans}
          className="bg-blue-500 text-white py-3 px-6 rounded-xl mt-2 hover:bg-blue-400"
        >
          Back
        </button>
        {isGenerateReportOpen && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
              <h2 className="text-xl font-semibold text-center mb-6">
                Generating Your Report
              </h2>
              <p className="text-center">
                Your report is being generated. Please wait...
              </p>
              <button
                onClick={() => setIsGenerateReportOpen(false)}
                className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-400"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Plans;

const plansDetails = [
  {
    title: "EBOSS",
    subtitle: "Start using the tool for Free",
    items: [
      "Access to the EBOSS AI-powered growth strategy tool for 1 year",
      "Includes step-by-step recorded training on how to use the tool",
      <div
        className="bg-white shadow-md rounded-full px-4 py-2 h-20 font-semibold text-sm text-black"
        key="highlight"
      >
        <span className="text-[#1a3365] font-bold ">
          Designed to help your company develop a data-driven growth strategy
        </span>
      </div>,
    ],
    buyNow: "Buy Now",
    price: "99$ one-time payment to generate report",
    buttonLabel: "Buy Now",
  },
  {
    title: "EBOSS plus",
    subtitle: "Start using the tool for EBOSS plus",
    items: [
      "Access to the EBOSS AI-powered growth strategy tool for 1 year",
      "Includes step-by-step recorded training on how to use the tool",
      <div
        className="bg-white shadow-md rounded-full px-4 h-20 py-2 font-semibold text-sm text-black"
        key="highlight"
      >
        <span className="text-[#1a3365] font-bold">
          Get Feedback on your strategy from an EBOSS Expert by Email
        </span>
      </div>,
    ],
    buyNow: "Buy Now",
    price: "499$ one-time payment",
    buttonLabel: "Buy Now",
  },
  {
    title: "EBOSS ultra",
    subtitle: "Start using the tool for EBOSS ultra",
    items: [
      "Access to the EBOSS AI-powered growth strategy tool for 1 year",
      "Includes step-by-step recorded training on how to use the tool",
      <div
        className="bg-white shadow-md rounded-full px-4 h-20 py-2 font-semibold text-sm text-black"
        key="highlight"
      >
        <span className="text-[#1a3365] font-bold">
          Get an EBOSS expert to meet with you in a 4-hours focused one to one
          meeting to enhance your strategy
        </span>
      </div>,
    ],
    buyNow: "Buy Now",
    price: "1999$ one-time payment",
    buttonLabel: "Buy Now",
  },
];
