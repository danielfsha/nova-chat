import React from "react";

const Loader = () => {
  const circleCommonClasses =
    "h-2 w-2 bg-pink-600/20 rounded-full animate-bounce dark:bg-pink-100";

  // Inline styles for staggered animation delays
  const delays = ["0s", "0.2s", "0.4s"];

  return (
    <div className="flex space-x-2 items-center justify-start w-full py-4">
      {delays.map((delay, index) => (
        <div
          key={index}
          className={circleCommonClasses}
          style={{ animationDelay: delay }}
        />
      ))}
    </div>
  );
};

export default Loader;
