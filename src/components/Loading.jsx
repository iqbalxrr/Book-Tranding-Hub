"use client";

import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex justify-center w-full h-full bg-[url('/ratting-bg.jpg')] bg-no-repeat bg-cover bg-center items-center z-50">
      <DotLottieReact
        src="https://lottie.host/d95e1be1-b7e8-43ae-b699-f3a0e0bbfdcd/ZkBbfQGIMp.lottie"
        loop
        autoplay
        style={{ width: 300, height: 300 }}
      />
    </div>
  );
};

export default Loading;
