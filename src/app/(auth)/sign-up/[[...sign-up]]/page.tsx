import React from "react";
import { SignUp } from "@clerk/nextjs";

const page = () => {
  return (
    <div className="flex flex-1/2 items-center justify-center p-4">
      <SignUp
        appearance={{
          variables: {
            colorBackground: "#eee8d5",
            colorPrimary: "#d33682",
            fontFamily: "serif",
            fontSize: "1rem",
          },
        }}
      />
    </div>
  );
};

export default page;
