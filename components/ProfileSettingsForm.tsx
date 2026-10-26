"use client";

import { useRef, useState, useTransition } from "react";
import Image from "next/image";
import { Loader2, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateUserProfile } from "@/lib/actions/user.actions";
import { useToast } from "@/hooks/use-toast";

interface Props {
  userId: string;
  fullName: string;
  email: string;
  avatar: string;
}

const ProfileSettingsForm = ({ userId, fullName, email, avatar }: Props) => {
  const [name, setName] = useState(fullName);
  const [avatarPreview, setAvatarPreview] = useState(avatar);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        await updateUserProfile({ userId, fullName: name, avatarFile });
        toast({
          description: "Profile updated successfully.",
        });
        setAvatarFile(null);
      } catch {
        toast({
          description: "We couldn't update your profile. Please try again.",
          className: "error-toast",
        });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-indigo-600">Profile settings</p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-900">Manage your FileFlow account</h1>
        <p className="mt-2 text-sm text-slate-500">Update your name and choose a profile image that appears in the sidebar and account area.</p>
      </div>

      <div className="flex flex-col gap-5 md:flex-row md:items-center">
        <div className="relative size-24 overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
          <Image src={avatarPreview} alt="Profile avatar" fill className="object-cover" />
        </div>

        <div className="space-y-3">
          <Button type="button" onClick={() => fileInputRef.current?.click()} className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2.5 text-white hover:bg-indigo-500">
            <UploadCloud className="size-4" />
            Change profile photo
          </Button>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          <p className="text-xs text-slate-500">PNG, JPG, GIF, WEBP, or SVG work best. New uploads are stored in your existing Appwrite bucket.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Full name</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} className="h-12 rounded-2xl border-slate-200 bg-slate-50" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Email</label>
          <Input value={email} disabled className="h-12 rounded-2xl border-slate-200 bg-slate-100 text-slate-500" />
        </div>
      </div>

      <div className="flex items-center justify-end">
        <Button type="submit" disabled={isPending} className="inline-flex min-w-[180px] items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-white hover:bg-slate-800">
          {isPending ? <Loader2 className="size-4 animate-spin" /> : null}
          Save changes
        </Button>
      </div>
    </form>
  );
};

export default ProfileSettingsForm;
