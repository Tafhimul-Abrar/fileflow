import React from "react";
import Sort from "@/components/Sort";
import { getFiles } from "@/lib/actions/file.actions";
import { Models } from "node-appwrite";
import Card from "@/components/Card";
import { convertFileSize, getFileTypesParams } from "@/lib/utils";

const Page = async ({ searchParams, params }: SearchParamProps) => {
  const type = ((await params)?.type as string) || "";
  const searchText = ((await searchParams)?.query as string) || "";
  const sort = ((await searchParams)?.sort as string) || "";

  const types = getFileTypesParams(type) as FileType[];

  const files = await getFiles({ types, searchText, sort });
  const totalSize = files.documents.reduce((sum: number, file: Models.Document) => sum + file.size, 0);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-600">Category</p>
            <h1 className="mt-1 text-3xl font-semibold capitalize text-slate-900">{type}</h1>
            <p className="mt-2 text-sm text-slate-500">
              {files.total} file{files.total === 1 ? "" : "s"} • {convertFileSize(totalSize)} total
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {searchText ? <p className="text-sm text-slate-400">Search: “{searchText}”</p> : null}
            <Sort />
          </div>
        </div>
      </section>

      {files.total > 0 ? (
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {files.documents.map((file: Models.Document) => (
            <Card key={file.$id} file={file} />
          ))}
        </section>
      ) : (
        <div className="rounded-[32px] border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-400 shadow-sm">
          No files uploaded here yet.
        </div>
      )}
    </div>
  );
};

export default Page;
