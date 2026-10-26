import ProfileSettingsForm from "@/components/ProfileSettingsForm";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

const SettingsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) redirect("/sign-in");

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-indigo-600 via-indigo-500 to-sky-500 p-6 text-white shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-100">Settings</p>
        <h2 className="mt-2 text-3xl font-semibold">Personalize your workspace</h2>
        <p className="mt-2 max-w-2xl text-sm text-indigo-100/90">
          Keep your profile up to date so your shared files and workspace feel more personal.
        </p>
      </div>

      <ProfileSettingsForm
        userId={currentUser.$id}
        fullName={currentUser.fullName}
        email={currentUser.email}
        avatar={currentUser.avatar}
      />
    </div>
  );
};

export default SettingsPage;
