import React from "react";
import { Button } from "@/components/ui/button";
import Search from "@/components/Search";
import FileUploader from "@/components/FileUploader";
import { signOutUser } from "@/lib/actions/user.actions";
import { LogOut } from "lucide-react";

const Header = ({
  userId,
  accountId,
}: {
  userId: string;
  accountId: string;
}) => {
  return (
    <header className="hidden border-b border-slate-200 bg-white px-6 py-5 md:block">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-600">FileFlow workspace</p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-900">Organize files without the clutter</h1>
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <Search />
          <div className="flex items-center gap-3 self-end lg:self-auto">
            <FileUploader ownerId={userId} accountId={accountId} />
            <form
              action={async () => {
                "use server";
                await signOutUser();
              }}
            >
              <Button type="submit" className="inline-flex h-11 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-slate-700 shadow-none hover:bg-slate-100">
                <LogOut className="size-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
