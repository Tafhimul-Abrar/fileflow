import { Models } from "node-appwrite";
import Thumbnail from "@/components/Thumbnail";
import FormattedDateTime from "@/components/FormattedDateTime";
import { convertFileSize, formatDateTime } from "@/lib/utils";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserRoundX } from "lucide-react";

const ImageThumbnail = ({ file }: { file: Models.Document }) => (
  <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
    <Thumbnail type={file.type} extension={file.extension} url={file.url} />
    <div className="flex flex-col">
      <p className="mb-1 line-clamp-1 text-sm font-semibold text-slate-900">{file.name}</p>
      <FormattedDateTime date={file.$createdAt} className="text-xs text-slate-500" />
    </div>
  </div>
);

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="grid grid-cols-[110px_1fr] gap-3 text-sm">
    <p className="font-medium text-slate-500">{label}</p>
    <p className="text-slate-900">{value}</p>
  </div>
);

export const FileDetails = ({ file }: { file: Models.Document }) => {
  return (
    <>
      <ImageThumbnail file={file} />
      <div className="space-y-4 px-1 pt-2">
        <DetailRow label="Format" value={file.extension} />
        <DetailRow label="Size" value={convertFileSize(file.size)} />
        <DetailRow label="Owner" value={file.owner.fullName} />
        <DetailRow label="Last edit" value={formatDateTime(file.$updatedAt)} />
      </div>
    </>
  );
};

interface Props {
  file: Models.Document;
  onInputChange: React.Dispatch<React.SetStateAction<string[]>>;
  onRemove: (email: string) => void;
}

export const ShareInput = ({ file, onInputChange, onRemove }: Props) => {
  return (
    <>
      <ImageThumbnail file={file} />

      <div className="space-y-4 pt-2">
        <div>
          <p className="text-sm font-medium text-slate-800">Share file with other users</p>
          <p className="mt-1 text-xs text-slate-500">Add one or more email addresses separated by commas.</p>
        </div>
        <Input
          type="email"
          placeholder="Enter email address"
          onChange={(e) => onInputChange(e.target.value.trim().split(","))}
          className="h-11 rounded-2xl border-slate-200 bg-slate-50"
        />
        <div className="pt-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-800">Shared with</p>
            <p className="text-sm text-slate-400">{file.users.length} users</p>
          </div>

          <ul className="mt-3 space-y-2">
            {file.users.map((email: string) => (
              <li key={email} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 px-3 py-2">
                <p className="text-sm text-slate-700">{email}</p>
                <Button
                  onClick={() => onRemove(email)}
                  className="h-8 rounded-full border border-slate-200 bg-white px-3 text-slate-600 shadow-none hover:bg-slate-50"
                >
                  <UserRoundX className="mr-1 size-4" />
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
