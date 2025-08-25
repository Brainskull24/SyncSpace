"use client";

import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "../../components/student-dashboard/layout/appSidebar";
import Topbar from "../../components/student-dashboard/layout/topBar";
import { useState } from "react";
import { Page } from "@/types/student-pages";
import { renderPage } from "../../components/student-dashboard/layout/pageRenderer";

export default function StudentLayout() {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <AppSidebar currentPage={currentPage} onPageChange={setCurrentPage} />
        </Sidebar>
        <main className="flex-1">
          <Topbar setCurrentPage={setCurrentPage} />
          <div className="flex-1">
            {renderPage(currentPage, setCurrentPage)}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
