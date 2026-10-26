import React from "react";
import Image from "next/image";
import { CheckCircle2, Cloud, FolderKanban, ShieldCheck } from "lucide-react";

const highlights = [
  {
    title: "Organized uploads",
    description: "Keep documents, images, media, and everything else in one clean space.",
    icon: FolderKanban,
  },
  {
    title: "Fast sharing",
    description: "Share files with collaborators in seconds using a simple email-based flow.",
    icon: Cloud,
  },
  {
    title: "Reliable access",
    description: "Use OTP sign-in and your Appwrite backend for a simple, secure workflow.",
    icon: ShieldCheck,
  },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-[1.1fr_0.9fr]">
      <section className="hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-sky-900 p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <div>
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur">
            <Image src="/assets/icons/fileflow-mark.svg" alt="FileFlow" width={36} height={36} />
            <Image src="/assets/icons/fileflow-logo.svg" alt="FileFlow" width={128} height={26} className="h-auto brightness-0 invert" />
          </div>

          <div className="mt-16 max-w-xl space-y-5">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-sky-200">Smarter file management</p>
            <h1 className="text-5xl font-semibold leading-tight">A cleaner home for everything you upload.</h1>
            <p className="max-w-lg text-base text-slate-300">
              FileFlow gives you a polished place to upload, organize, search, and share your files without the clutter of the original tutorial UI.
            </p>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <Icon className="size-8 text-sky-200" />
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
        <div className="w-full max-w-lg">
          <div className="mb-6 rounded-3xl border border-indigo-100 bg-indigo-50/80 p-4 text-sm text-slate-700 lg:hidden">
            <div className="mb-2 flex items-center gap-2 font-semibold text-slate-900">
              <CheckCircle2 className="size-4 text-indigo-600" />
              FileFlow is ready.
            </div>
            Sign in with your email or create a new workspace to start managing your files.
          </div>
          {children}
        </div>
      </section>
    </div>
  );
};

export default Layout;
