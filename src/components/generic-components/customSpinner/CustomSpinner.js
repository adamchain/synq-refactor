import { Spin } from "antd";
import React from "react";

import { usePromiseTracker } from "react-promise-tracker";
import "./CustomSpinner.scss";

const CustomSpinner = ({ component, isSpinning }) => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    <Spin
      className="custom-whskr-spin"
      size="large"
      spinning={
        isSpinning !== undefined && isSpinning !== null
          ? isSpinning
          : promiseInProgress
      }
      indicator={
        <div>
          <svg className="custom-whskr-spin-icon" viewBox="-5 -5 120 120">
            <g fillRule="nonzero">
              <path d="M53.8 3.5a16 16 0 00-11 4.41 16 16 0 00-11-4.41 16.11 16.11 0 00-14.43 9 11.62 11.62 0 00-.83 2.07 16.08 16.08 0 003.95 16.26L36.54 47A4.87 4.87 0 0138 50.39v1.7c0 8.34-4.76 13.52-12.43 13.52S13.09 60.54 13.1 52.06a4.58 4.58 0 00-4.62-4.51h-.4A4.54 4.54 0 003.5 52c0 13.89 8.25 22.52 21.57 22.52 6.93 0 12.79-2.65 16.51-7.47a1.49 1.49 0 011.18-.59 1.5 1.5 0 011.19.59c3.71 4.82 9.58 7.47 16.5 7.47C73.78 74.54 82.05 65.91 82 52a4.54 4.54 0 00-4.58-4.47h-.4a4.57 4.57 0 00-4.62 4.51c0 8.48-4.64 13.55-12.43 13.55s-12.41-5.16-12.41-13.5v-1.7A4.88 4.88 0 0149 47l15.78-15.84a16.63 16.63 0 005-11.23A16 16 0 0053.8 3.5zm-11 17.13l6.08-6.09a7 7 0 019.91 9.91l-16 16-16-16a7 7 0 019.91-9.91l6.09 6.09z"></path>
            </g>
            <path></path>
          </svg>
        </div>
      }
    >
      {component}
    </Spin>
  );
};

export default CustomSpinner;
