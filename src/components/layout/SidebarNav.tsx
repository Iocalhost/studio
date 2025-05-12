// src/components/layout/SidebarNav.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { NAV_ITEMS } from '@/lib/constants';
import { Home, Swords, Brain, MapIcon, ScrollText, Sparkles, Settings, LucideIcon } from 'lucide-react'; // Added more icons
import { cn } from '@/lib/utils';

const iconMap: Record<string, LucideIcon> = {
  Home,
  Swords,
  Brain,
  Map: MapIcon,
  Scroll: ScrollText,
  Sparkles,
  Settings,
};


export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {NAV_ITEMS.map((item) => {
        const IconComponent = iconMap[item.icon] || Sparkles; // Default to Sparkles if icon not found
        const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
        return (
          <SidebarMenuItem key={item.href}>
            <Link href={item.href} passHref legacyBehavior>
              <SidebarMenuButton
                className={cn(
                  "w-full justify-start",
                  isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
                )}
                isActive={isActive}
                tooltip={{ children: item.label, side: 'right', align: 'center' }}
              >
                <IconComponent className="h-5 w-5" />
                <span className="group-data-[collapsible=icon]:hidden">
                  {item.label}
                </span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
