"use client";

import React, { useCallback, useState } from "react";

import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { cn, convertFileToUrl, getFileType } from "@/lib/utils";
import Thumbnail from "@/components/Thumbnail";
import { MAX_FILE_SIZE } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { uploadFile } from "@/lib/actions/file.actions";
import { usePathname } from "next/navigation";
import { Loader2, UploadCloud, X } from "lucide-react";

interface Props {
  ownerId: string;
  accountId: string;
  className?: string;
}

const FileUploader = ({ ownerId, accountId, className }: Props) => {
  const path = usePathname();
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);

      const uploadPromises = acceptedFiles.map(async (file) => {
        if (file.size > MAX_FILE_SIZE) {
          setFiles((prevFiles) => prevFiles.filter((f) => f.name !== file.name));

          return toast({
            description: `${file.name} is too large. Max file size is 50MB.`,
            className: "error-toast",
          });
        }

        return uploadFile({ file, ownerId, accountId, path }).then((uploadedFile) => {
          if (uploadedFile) {
            setFiles((prevFiles) => prevFiles.filter((f) => f.name !== file.name));
          }
        });
      });

      await Promise.all(uploadPromises);
    },
    [ownerId, accountId, path, toast],
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleRemoveFile = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    fileName: string,
  ) => {
    e.stopPropagation();
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  return (
    <div className="relative" {...getRootProps()}>
      <input {...getInputProps()} />
      <Button type="button" className={cn("inline-flex h-11 items-center gap-2 rounded-full bg-indigo-600 px-5 text-white hover:bg-indigo-500", className)}>
        <UploadCloud className="size-4" />
        <p>Upload</p>
      </Button>
      {files.length > 0 && (
        <ul className="absolute right-0 top-[calc(100%+0.75rem)] z-20 w-[320px] space-y-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-xl">
          <h4 className="text-sm font-semibold text-slate-900">Uploading</h4>

          {files.map((file, index) => {
            const { type, extension } = getFileType(file.name);

            return (
              <li key={`${file.name}-${index}`} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 p-3">
                <div className="flex min-w-0 items-center gap-3">
                  <Thumbnail type={type} extension={extension} url={convertFileToUrl(file)} />

                  <div className="min-w-0">
                    <p className="line-clamp-1 text-sm font-medium text-slate-900">{file.name}</p>
                    <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                      <Loader2 className="size-3 animate-spin" />
                      Uploading...
                    </div>
                  </div>
                </div>

                <button type="button" onClick={(e) => handleRemoveFile(e, file.name)} className="rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
                  <X className="size-4" />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default FileUploader;
