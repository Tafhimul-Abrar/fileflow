import { Models } from "node-appwrite";
import Link from "next/link";
import Image from "next/image";
import ActionDropdown from "@/components/ActionDropdown";
import { Chart } from "@/components/Chart";
import { FormattedDateTime } from "@/components/FormattedDateTime";
import { Thumbnail } from "@/components/Thumbnail";
import { getFiles, getTotalSpaceUsed } from "@/lib/actions/file.actions";
import { convertFileSize, getUsageSummary } from "@/lib/utils";

const Dashboard = async () => {
  const [files, totalSpace] = await Promise.all([
    getFiles({ types: [], limit: 10 }),
    getTotalSpaceUsed(),
  ]);

  const usageSummary = getUsageSummary(totalSpace);
  const sharedCount = files.documents.filter((file: Models.Document) => file.users.length > 0).length;
  const allFilesSize = files.documents.reduce((sum: number, file: Models.Document) => sum + file.size, 0);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <Chart used={totalSpace.used} />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total files</p>
            <h3 className="mt-2 text-3xl font-semibold text-slate-900">{files.total}</h3>
            <p className="mt-2 text-sm text-slate-400">Across all your categories</p>
          </div>
          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Shared files</p>
            <h3 className="mt-2 text-3xl font-semibold text-slate-900">{sharedCount}</h3>
            <p className="mt-2 text-sm text-slate-400">Files currently shared with others</p>
          </div>
          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:col-span-2 xl:col-span-1">
            <p className="text-sm text-slate-500">Recent total size</p>
            <h3 className="mt-2 text-3xl font-semibold text-slate-900">{convertFileSize(allFilesSize)}</h3>
            <p className="mt-2 text-sm text-slate-400">Combined size of your visible files</p>
          </div>
        </div>
      </div>

      <section>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-600">Overview</p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-900">Browse usage by category</h2>
          </div>
        </div>

        <ul className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {usageSummary.map((summary) => (
            <Link
              href={summary.url}
              key={summary.title}
              className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-4">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-slate-100">
                    <Image src={summary.icon} width={32} height={32} alt={summary.title} className="size-8 object-contain" />
                  </div>
                  <div>
                    <h5 className="text-lg font-semibold text-slate-900">{summary.title}</h5>
                    <p className="mt-1 text-sm text-slate-400">{summary.latestDate ? `Last update ${new Date(summary.latestDate).toLocaleDateString()}` : "No files yet"}</p>
                  </div>
                </div>
                <h4 className="text-right text-xl font-semibold text-slate-900">{convertFileSize(summary.size) || 0}</h4>
              </div>
            </Link>
          ))}
        </ul>
      </section>

      <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-600">Recent uploads</p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-900">Latest files in your workspace</h2>
          </div>
        </div>
        {files.documents.length > 0 ? (
          <ul className="mt-6 flex flex-col gap-4">
            {files.documents.map((file: Models.Document) => (
              <Link href={file.url} target="_blank" className="flex flex-col gap-4 rounded-3xl border border-slate-100 p-4 transition hover:bg-slate-50 lg:flex-row lg:items-center lg:justify-between" key={file.$id}>
                <div className="flex min-w-0 items-center gap-4">
                  <Thumbnail type={file.type} extension={file.extension} url={file.url} className="size-14" imageClassName="size-8" />

                  <div className="min-w-0">
                    <p className="line-clamp-1 text-sm font-semibold text-slate-900">{file.name}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <FormattedDateTime date={file.$createdAt} className="text-xs text-slate-500" />
                      <span>{convertFileSize(file.size)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 lg:justify-end">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium capitalize text-slate-600">{file.type}</span>
                  <ActionDropdown file={file} />
                </div>
              </Link>
            ))}
          </ul>
        ) : (
          <p className="mt-10 text-center text-sm text-slate-400">No files uploaded yet.</p>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
