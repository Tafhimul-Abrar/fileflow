"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Models } from "node-appwrite";
import { actionsDropdownItems } from "@/constants";
import Link from "next/link";
import { constructDownloadUrl } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  deleteFile,
  renameFile,
  updateFileUsers,
} from "@/lib/actions/file.actions";
import { usePathname } from "next/navigation";
import { FileDetails, ShareInput } from "@/components/ActionsModalContent";
import {
  Download,
  Info,
  Loader2,
  MoreHorizontal,
  Pencil,
  Share2,
  Trash2,
} from "lucide-react";

const iconMap = {
  rename: Pencil,
  details: Info,
  share: Share2,
  download: Download,
  delete: Trash2,
} as const;

const ActionDropdown = ({ file }: { file: Models.Document }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [action, setAction] = useState<ActionType | null>(null);
  const [name, setName] = useState(file.name.replace(`.${file.extension}`, ""));
  const [isLoading, setIsLoading] = useState(false);
  const [emails, setEmails] = useState<string[]>([]);

  const path = usePathname();

  const closeAllModals = () => {
    setIsModalOpen(false);
    setIsDropdownOpen(false);
    setAction(null);
    setName(file.name.replace(`.${file.extension}`, ""));
  };

  const handleAction = async () => {
    if (!action) return;
    setIsLoading(true);
    let success = false;

    const actions = {
      rename: () =>
        renameFile({ fileId: file.$id, name, extension: file.extension, path }),
      share: () => updateFileUsers({ fileId: file.$id, emails, path }),
      delete: () =>
        deleteFile({ fileId: file.$id, bucketFileId: file.bucketFileId, path }),
    };

    success = await actions[action.value as keyof typeof actions]();

    if (success) closeAllModals();

    setIsLoading(false);
  };

  const handleRemoveUser = async (email: string) => {
    const updatedEmails = emails.filter((e) => e !== email);

    const success = await updateFileUsers({
      fileId: file.$id,
      emails: updatedEmails,
      path,
    });

    if (success) setEmails(updatedEmails);
    closeAllModals();
  };

  const renderDialogContent = () => {
    if (!action) return null;

    const { value, label } = action;

    return (
      <DialogContent className="max-w-md rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl">
        <DialogHeader className="flex flex-col gap-3">
          <DialogTitle className="text-center text-xl font-semibold text-slate-900">
            {label}
          </DialogTitle>
          {value === "rename" && (
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 rounded-2xl border-slate-200 bg-slate-50"
            />
          )}
          {value === "details" && <FileDetails file={file} />}
          {value === "share" && (
            <ShareInput file={file} onInputChange={setEmails} onRemove={handleRemoveUser} />
          )}
          {value === "delete" && (
            <p className="rounded-2xl border border-rose-100 bg-rose-50 p-4 text-sm text-rose-700">
              Are you sure you want to delete <span className="font-semibold">{file.name}</span>?
            </p>
          )}
        </DialogHeader>
        {["rename", "delete", "share"].includes(value) && (
          <DialogFooter className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Button onClick={closeAllModals} className="h-11 flex-1 rounded-full border border-slate-200 bg-white text-slate-700 shadow-none hover:bg-slate-50">
              Cancel
            </Button>
            <Button onClick={handleAction} className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-slate-900 text-white hover:bg-slate-800">
              <p className="capitalize">{value}</p>
              {isLoading && <Loader2 className="size-4 animate-spin" />}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    );
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger className="rounded-full p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900">
          <MoreHorizontal className="size-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 rounded-2xl border border-slate-200 bg-white p-1 shadow-lg">
          <DropdownMenuLabel className="max-w-[200px] truncate text-slate-900">
            {file.name}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {actionsDropdownItems.map((actionItem) => {
            const Icon = iconMap[actionItem.value as keyof typeof iconMap];
            return (
              <DropdownMenuItem
                key={actionItem.value}
                className="cursor-pointer rounded-xl px-3 py-2 text-sm text-slate-700 focus:bg-slate-100"
                onClick={() => {
                  setAction(actionItem);

                  if (["rename", "share", "delete", "details"].includes(actionItem.value)) {
                    setIsModalOpen(true);
                  }
                }}
              >
                {actionItem.value === "download" ? (
                  <Link
                    href={constructDownloadUrl(file.bucketFileId)}
                    download={file.name}
                    className="flex items-center gap-2"
                  >
                    <Icon className="size-4" />
                    {actionItem.label}
                  </Link>
                ) : (
                  <div className="flex items-center gap-2">
                    <Icon className="size-4" />
                    {actionItem.label}
                  </div>
                )}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      {renderDialogContent()}
    </Dialog>
  );
};
export default ActionDropdown;
