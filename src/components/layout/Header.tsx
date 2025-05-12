// src/components/layout/Header.tsx
"use client";

import React from 'react';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LevelInput } from "@/components/blade-guide/LevelInput";
import { APP_NAME } from '@/lib/constants';
import { Shield } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur md:px-6">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <div className="flex items-center gap-2">
        <Shield className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-semibold text-foreground">{APP_NAME}</h1>
      </div>
      <div className="ml-auto">
        <LevelInput />
      </div>
    </header>
  );
}
