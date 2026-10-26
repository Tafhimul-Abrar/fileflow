"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getFiles } from "@/lib/actions/file.actions";
import { Models } from "node-appwrite";
import Thumbnail from "@/components/Thumbnail";
import FormattedDateTime from "@/components/FormattedDateTime";
import { useDebounce } from "use-debounce";
import { SearchIcon } from "lucide-react";

const Search = () => {
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  const [results, setResults] = useState<Models.Document[]>([]);
  const [open, setOpen] = useState(false);
  const [debouncedQuery] = useDebounce(query, 300);
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    const fetchFiles = async () => {
      if (debouncedQuery.length === 0) {
        setResults([]);
        setOpen(false);
        const params = new URLSearchParams(searchParams.toString());
        params.delete("query");
        const nextUrl = params.toString() ? `${path}?${params.toString()}` : path;
        return router.push(nextUrl);
      }

      const files = await getFiles({ types: [], searchText: debouncedQuery });
      setResults(files.documents);
      setOpen(true);
    };

    fetchFiles();
  }, [debouncedQuery, path, router, searchParams]);

  useEffect(() => {
    if (!searchQuery) {
      setQuery("");
    }
  }, [searchQuery]);

  const handleClickItem = (file: Models.Document) => {
    setOpen(false);
    setResults([]);

    router.push(
      `/${file.type === "video" || file.type === "audio" ? "media" : `${file.type}s`}?query=${query}`,
    );
  };

  return (
    <div className="relative w-full xl:min-w-[420px] xl:max-w-[480px]">
      <div className="flex h-11 items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4">
        <SearchIcon className="size-4 text-slate-400" />
        <Input
          value={query}
          placeholder="Search files"
          className="border-none bg-transparent p-0 text-sm text-slate-700 shadow-none placeholder:text-slate-400 focus-visible:ring-0"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {open && (
        <ul className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-20 max-h-[360px] overflow-auto rounded-3xl border border-slate-200 bg-white p-3 shadow-lg">
          {results.length > 0 ? (
            results.map((file) => (
              <li
                className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl px-3 py-2 hover:bg-slate-50"
                key={file.$id}
                onClick={() => handleClickItem(file)}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <Thumbnail
                    type={file.type}
                    extension={file.extension}
                    url={file.url}
                    className="size-10 min-w-10"
                    imageClassName="size-6"
                  />
                  <p className="line-clamp-1 text-sm font-medium text-slate-700">{file.name}</p>
                </div>

                <FormattedDateTime date={file.$createdAt} className="hidden text-xs text-slate-400 sm:block" />
              </li>
            ))
          ) : (
            <p className="px-3 py-4 text-center text-sm text-slate-400">No files found</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default Search;
