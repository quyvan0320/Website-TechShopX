import React from "react";
import { FaCheck } from "react-icons/fa";

const ProgressSteps = ({ step1, step2, step3 }) => {
  return (
    <div className="flex justify-center items-center space-x-4">
      <div
        className={`${
          step1 ? "text-primary-blue" : "text-gray-300"
        } flex flex-col items-center gap-1`}
      >
        <span className="">Mua Hàng</span>
        <div className="text-lg text-center p-1 rounded-md bg-primary-blue">
          <FaCheck className="text-white" size={20} />
        </div>
      </div>

      {step2 && (
        <>
          {step1 && <div className="h-0.5 w-[10rem] bg-primary-blue"></div>}
          <div
            className={`${
              step1 ? "text-primary-blue" : "text-gray-300"
            } flex flex-col items-center gap-1`}
          >
            <span className="">Thông Tin</span>
            <div className="text-lg text-center p-1 rounded-md bg-primary-blue">
              <FaCheck className="text-white" size={20} />
            </div>
          </div>
        </>
      )}
      <>
        {step1 && step2 && step3 ? (
          <div className="h-0.5 w-[10rem] bg-primary-blue"></div>
        ) : (
          ""
        )}

        <div
          className={`${
            step3 ? "text-primary-blue" : "text-gray-300"
          } flex flex-col items-center gap-1`}
        >
          <span className={`${!step3 ? "ml-[10rem]" : ""}`}>Xác Nhận</span>
          {step1 && step2 && step3 ? (
            <div className="text-lg text-center p-1 rounded-md bg-primary-blue">
              <FaCheck className="text-white" size={20} />
            </div>
          ) : (
            ""
          )}
        </div>
      </>
    </div>
  );
};

export default ProgressSteps;
