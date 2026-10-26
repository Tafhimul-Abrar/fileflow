"use client";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { navItems } from "@/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import FileUploader from "@/components/FileUploader";
import { signOutUser } from "@/lib/actions/user.actions";
import {
  Archive,
  FileText,
  ImageIcon,
  LayoutDashboard,
  LogOut,
  Menu,
  PlaySquare,
  Settings,
} from "lucide-react";

interface Props {
  $id: string;
  accountId: string;
  fullName: string;
  avatar: string;
  email: string;
}

const iconMap = {
  Dashboard: LayoutDashboard,
  Documents: FileText,
  Images: ImageIcon,
  Media: PlaySquare,
  Others: Archive,
} as const;

const MobileNavigation = ({
  $id: ownerId,
  accountId,
  fullName,
  avatar,
  email,
}: Props) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 px-4 py-4 backdrop-blur md:hidden">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/assets/icons/fileflow-mark.svg" alt="FileFlow" width={36} height={36} />
          <Image src="/assets/icons/fileflow-logo.svg" alt="FileFlow" width={108} height={22} className="h-auto" />
        </Link>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="rounded-2xl border border-slate-200 p-2 text-slate-700">
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent className="h-screen w-[320px] border-l border-slate-200 bg-white px-5 py-6">
            <SheetTitle className="sr-only">Mobile menu</SheetTitle>

            <div className="flex items-center gap-3 rounded-3xl bg-slate-50 p-4">
              <Image src={avatar} alt="avatar" width={48} height={48} className="size-12 rounded-2xl object-cover" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold capitalize text-slate-900">{fullName}</p>
                <p className="truncate text-xs text-slate-500">{email}</p>
              </div>
            </div>

            <nav className="mt-6">
              <ul className="space-y-2">
                {navItems.map(({ url, name }) => {
                  const Icon = iconMap[name as keyof typeof iconMap];
                  const isActive = pathname === url;
                  return (
                    <li key={name}>
                      <Link
                        href={url}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                          isActive
                            ? "bg-slate-900 text-white"
                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                        )}
                      >
                        <Icon className="size-5" />
                        <span>{name}</span>
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <Link
                    href="/settings"
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                      pathname === "/settings"
                        ? "bg-slate-900 text-white"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                    )}
                  >
                    <Settings className="size-5" />
                    <span>Settings</span>
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="mt-8 flex flex-col gap-3">
              <FileUploader ownerId={ownerId} accountId={accountId} className="w-full justify-center" />
              <Button
                type="button"
                className="flex h-11 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white text-slate-700 shadow-none hover:bg-slate-100"
                onClick={async () => await signOutUser()}
              >
                <LogOut className="size-4" />
                <span>Logout</span>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default MobileNavigation;
