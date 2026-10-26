"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { sortTypes } from "@/constants";

const Sort = () => {
  const path = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.push(`${path}?${params.toString()}`);
  };

  return (
    <Select onValueChange={handleSort} defaultValue={searchParams.get("sort") || sortTypes[0].value}>
      <SelectTrigger className="h-11 min-w-[180px] rounded-full border-slate-200 bg-white text-sm text-slate-700 shadow-none">
        <SelectValue placeholder={sortTypes[0].label} />
      </SelectTrigger>
      <SelectContent className="rounded-2xl border border-slate-200 bg-white">
        {sortTypes.map((sort) => (
          <SelectItem key={sort.label} className="cursor-pointer rounded-xl text-sm" value={sort.value}>
            {sort.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Sort;
