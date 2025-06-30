"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { recruiterSidebarItems } from "@/utils/sidebarItemsData";
import Link from "next/link";
import { usePathname } from "next/navigation";

const RecruiterSidebar = () => {
  const pathname = usePathname();

  return (
    <Sidebar className="top-[72px]">
      <SidebarContent className="p-2">
        <SidebarMenu className="mt-16 space-y-4">
          {recruiterSidebarItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                asChild
                className="data-[active=true]:bg-primary gap-3 rounded-xl py-6"
                isActive={item.url === pathname}
              >
                <Link href={item.url}>
                  <item.icon className="!size-6" />
                  <span className="text-lg">{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default RecruiterSidebar;
