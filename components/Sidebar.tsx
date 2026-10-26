"use client";

import Link from "next/link";
import Image from "next/image";
import { navItems } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Archive,
  FileText,
  ImageIcon,
  LayoutDashboard,
  PlaySquare,
  Settings,
} from "lucide-react";

interface Props {
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

const Sidebar = ({ fullName, avatar, email }: Props) => {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-[280px] shrink-0 border-r border-slate-200 bg-white p-6 md:flex md:flex-col">
      <Link href="/" className="flex items-center gap-3">
        <Image src="/assets/icons/fileflow-mark.svg" alt="FileFlow" width={40} height={40} />
        <Image src="/assets/icons/fileflow-logo.svg" alt="FileFlow" width={138} height={28} className="h-auto" />
      </Link>

      <div className="mt-8 rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-500 to-sky-500 p-5 text-white shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-100">FileFlow</p>
        <h2 className="mt-2 text-xl font-semibold">Clean up your file workflow</h2>
        <p className="mt-2 text-sm text-indigo-100/90">
          Upload, organize, and share everything from one calm workspace.
        </p>
      </div>

      <nav className="mt-8 flex-1">
        <ul className="space-y-2">
          {navItems.map(({ url, name }) => {
            const Icon = iconMap[name as keyof typeof iconMap];
            const isActive = pathname === url;

            return (
              <li key={name}>
                <Link
                  href={url}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                    isActive
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                  )}
                >
                  <Icon className="size-5" />
                  <span>{name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <Link
        href="/settings"
        className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-4 transition hover:border-indigo-200 hover:bg-indigo-50"
      >
        <div className="flex items-center gap-3">
          <Image src={avatar} alt="Avatar" width={48} height={48} className="size-12 rounded-2xl object-cover" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold capitalize text-slate-900">{fullName}</p>
            <p className="truncate text-xs text-slate-500">{email}</p>
          </div>
          <Settings className="size-4 text-slate-400" />
        </div>
        <p className="mt-3 text-xs font-medium text-indigo-600">Edit profile photo & account settings</p>
      </Link>
    </aside>
  );
};
export default Sidebar;
