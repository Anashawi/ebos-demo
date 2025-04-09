import React from "react";
import Link from "next/link";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";

const Plans = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Link
          href=""
          className="btn-primary-light text-center text-white hover:text-white"
        >
          Generate Report
        </Link>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-full max-w-none sm:max-w-none md:max-w-none lg:max-w-none xl:max-w-none rounded-none min-h-screen p-0">
        <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
          <AlertDialogHeader className="text-center">
            <AlertDialogTitle className="text-3xl font-bold text-gray-900 mt-10">
              EBOSS Plans
            </AlertDialogTitle>
          </AlertDialogHeader>

          <AlertDialogDescription asChild>
            <div className="mx-auto bg-white p-8">
              {/* Plan 1 */}
              <div className="mb-10">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Start using the tool for Free
                </h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-4">
                  <li>
                    Access to the EBOSS AI-powered growth strategy tool for 1
                    year
                  </li>
                  <li>
                    Includes step-by-step recorded training on how to use the
                    tool
                  </li>
                  <li>
                    Designed to help your company to develop a data-driven
                    growth strategy
                  </li>
                </ul>
                <div className="flex justify-between items-center">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md">
                    Build Your Strategy
                  </button>
                  <p className="text-gray-900 font-medium">
                    99$ one-time payment to generate report.
                  </p>
                </div>
              </div>
              <hr className="my-8 border-gray-200" />

              {/* Plan 2 */}
              <div className="mb-10">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Access to the EBOSS AI-powered growth strategy tool for 1 year
                </h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-4">
                  <li>
                    Includes step-by-step recorded training on how to use the
                    tool
                  </li>
                  <li>
                    Get Feedback on your strategy from an EBOSS Expert by Email
                  </li>
                </ul>
                <div className="flex justify-between items-center">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md">
                    Buy now
                  </button>
                  <p className="text-gray-900 font-medium">
                    499$ one-time payment
                  </p>
                </div>
              </div>
              <hr className="my-8 border-gray-200" />

              {/* Plan 3 */}
              <div className="mb-10">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Access to the EBOSS AI-powered growth strategy tool for 1 year
                </h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-4">
                  <li>
                    Includes step-by-step recorded training on how to use the
                    tool
                  </li>
                  <li>
                    Get an EBOSS expert to meet with you in a 4-hour focused one
                    to one meeting to enhance your strategy.
                  </li>
                </ul>
                <div className="flex justify-between items-center">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md">
                    Buy Now
                  </button>
                  <p className="text-gray-900 font-medium">
                    1999$ one-time payment
                  </p>
                </div>
              </div>
              <hr className="my-8 border-gray-200" />
            </div>
          </AlertDialogDescription>

          <AlertDialogFooter className="px-8 pb-8">
            <AlertDialogAction>Cancel</AlertDialogAction>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Plans;
