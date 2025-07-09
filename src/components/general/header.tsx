"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignJustify } from "lucide-react";
import { recruiterSidebarItems } from "@/utils/sidebarItemsData";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Header = () => {
  const pathname = usePathname();

  return (
    <div className="bg-background sticky top-0 z-[10] flex h-[72px] items-center justify-between border-b p-4">
      <p className="font-serif text-2xl font-bold">bigshot</p>
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
        <div className="flex items-center gap-6">
          <UserButton />
          <Sheet>
            <SheetTrigger>
              <AlignJustify />
            </SheetTrigger>
            <SheetContent>
              <SheetTitle className="hidden">menu item</SheetTitle>
              <div className="mt-16 flex flex-col gap-2 p-3">
                {recruiterSidebarItems.map((item) => (
                  <Link
                    href={item.url}
                    key={item.id}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-2 py-3",
                      item.url === pathname && "bg-primary text-white",
                    )}
                  >
                    <item.icon className="!size-6" />
                    <span className="text-lg">{item.label}</span>
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </SignedIn>
    </div>
  );
};

export default Header;
