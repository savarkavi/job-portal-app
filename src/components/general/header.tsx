import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex items-center justify-between border-b p-4">
      <h2 className="font-serif text-2xl font-bold">bigshot</h2>
      <div className="flex items-center gap-4">
        <Link href="/sign-in">
          <Button variant="outline">Log In</Button>
        </Link>
        <Link href="/sign-up">
          <Button>Sign Up</Button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
