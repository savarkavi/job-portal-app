import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <div className="bg-background sticky top-0 z-[99] flex h-[72px] items-center justify-between border-b p-4">
      <h2 className="font-serif text-2xl font-bold">bigshot</h2>
      <SignedOut>
        <div className="flex items-center gap-4">
          <Link href="/sign-in">
            <Button variant="outline">Log In</Button>
          </Link>
          <Link href="/sign-up">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default Header;
