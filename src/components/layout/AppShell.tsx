// src/components/layout/AppShell.tsx
"use client"; // This component uses client-side hooks from shadcn/ui/sidebar and context

import React from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarInset,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Header } from "./Header";
import { SidebarNav } from "./SidebarNav";
import { PlayerLevelProvider } from '@/context/PlayerLevelContext';
import { APP_NAME } from '@/lib/constants';
import { ShieldCheck } from 'lucide-react';
import Link from 'next/link';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <PlayerLevelProvider>
      <SidebarProvider defaultOpen>
        <div className="flex min-h-screen w-full">
          <Sidebar collapsible="icon" variant="sidebar" side="left" className="border-r">
            <SidebarHeader className="p-4">
              <Link href="/" className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
                <ShieldCheck className="h-7 w-7 text-sidebar-primary group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8" />
                <span className="text-lg font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
                  {APP_NAME}
                </span>
              </Link>
            </SidebarHeader>
            <SidebarContent className="p-2">
              <SidebarNav />
            </SidebarContent>
            {/* <SidebarFooter className="p-2">
              User settings or other footer items could go here
            </SidebarFooter> */}
            <SidebarRail />
          </Sidebar>
          <SidebarInset className="flex flex-col">
            <Header />
            <main className="flex-1 overflow-y-auto p-4 md:p-6">
              {children}
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </PlayerLevelProvider>
  );
}
