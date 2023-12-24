import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto flex items-center justify-center lg:max-w-7xl sm:px-6 sm:py-5">
      {children}
    </div>
  );
};

export default Container;
