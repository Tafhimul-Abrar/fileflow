import { Models } from "node-appwrite";
import Link from "next/link";
import Thumbnail from "@/components/Thumbnail";
import { convertFileSize } from "@/lib/utils";
import FormattedDateTime from "@/components/FormattedDateTime";
import ActionDropdown from "@/components/ActionDropdown";

const Card = ({ file }: { file: Models.Document }) => {
  return (
    <Link href={file.url} target="_blank" className="group rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Thumbnail
            type={file.type}
            extension={file.extension}
            url={file.url}
            className="size-14"
            imageClassName="size-8"
          />
          <div>
            <p className="line-clamp-1 text-sm font-semibold text-slate-900">{file.name}</p>
            <p className="mt-1 text-xs text-slate-500">{convertFileSize(file.size)}</p>
          </div>
        </div>

        <ActionDropdown file={file} />
      </div>

      <div className="mt-5 space-y-2 border-t border-slate-100 pt-4">
        <FormattedDateTime date={file.$createdAt} className="text-xs text-slate-500" />
        <p className="text-xs text-slate-400">Shared by {file.owner.fullName}</p>
      </div>
    </Link>
  );
};
export default Card;
