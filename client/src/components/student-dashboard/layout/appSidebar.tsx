"use client";

import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { useUser } from "@/context/Authcontext";
import { Page } from "@/types/student-pages";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Sidebar, GraduationCap, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { navigation } from "@/types/student-pages";

function AppSidebar({
  currentPage,
  onPageChange,
}: {
  currentPage: Page;
  onPageChange: (page: Page) => void;
}) {
  const router = useRouter();
  const { user, loading } = useUser();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">SyncSpace</h2>
            <p className="text-sm text-muted-foreground">Student Portal</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <div className="mb-6">
          <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/?height=40&width=40" />
              <AvatarFallback>{user.firstName?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">
                {user.firstName} {user.lastName}
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {user.isTeamAlloted ? user.isTeamLead : "No Team"}
                </Badge>
              </div>
            </div>
          </div>
        </div>
        <SidebarMenu>
          {navigation.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                isActive={currentPage === item.id}
                onClick={() => onPageChange(item.id as Page)}
                className="w-full justify-start"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </>
  );
}

export default AppSidebar;
