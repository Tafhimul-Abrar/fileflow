"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { verifySecret, sendEmailOTP } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import { Loader2, X } from "lucide-react";

const OtpModal = ({
  accountId,
  email,
}: {
  accountId: string;
  email: string;
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const sessionId = await verifySecret({ accountId, password });
      if (sessionId) router.push("/");
    } catch (error) {
      console.log("Failed to verify OTP", error);
    }

    setIsLoading(false);
  };

  const handleResendOtp = async () => {
    await sendEmailOTP({ email });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="max-w-md rounded-[28px] border border-slate-200 bg-white p-8 shadow-xl">
        <AlertDialogHeader className="relative">
          <button type="button" onClick={() => setIsOpen(false)} className="absolute right-0 top-0 rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
            <X className="size-4" />
          </button>
          <AlertDialogTitle className="text-center text-2xl font-semibold text-slate-900">
            Enter your OTP
          </AlertDialogTitle>
          <AlertDialogDescription className="mx-auto max-w-sm text-center text-sm text-slate-500">
            We sent a 6-digit code to <span className="font-medium text-indigo-600">{email}</span>. Enter it below to continue.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <InputOTP maxLength={6} value={password} onChange={setPassword}>
          <InputOTPGroup className="flex w-full justify-between gap-2">
            <InputOTPSlot index={0} className="size-12 rounded-2xl border border-slate-200 text-lg font-semibold text-slate-900 sm:size-14" />
            <InputOTPSlot index={1} className="size-12 rounded-2xl border border-slate-200 text-lg font-semibold text-slate-900 sm:size-14" />
            <InputOTPSlot index={2} className="size-12 rounded-2xl border border-slate-200 text-lg font-semibold text-slate-900 sm:size-14" />
            <InputOTPSlot index={3} className="size-12 rounded-2xl border border-slate-200 text-lg font-semibold text-slate-900 sm:size-14" />
            <InputOTPSlot index={4} className="size-12 rounded-2xl border border-slate-200 text-lg font-semibold text-slate-900 sm:size-14" />
            <InputOTPSlot index={5} className="size-12 rounded-2xl border border-slate-200 text-lg font-semibold text-slate-900 sm:size-14" />
          </InputOTPGroup>
        </InputOTP>

        <AlertDialogFooter>
          <div className="flex w-full flex-col gap-4">
            <AlertDialogAction
              onClick={handleSubmit}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-slate-900 text-white hover:bg-slate-800"
              type="button"
            >
              Verify code
              {isLoading && <Loader2 className="size-4 animate-spin" />}
            </AlertDialogAction>

            <div className="text-center text-sm text-slate-500">
              Didn&apos;t get a code?
              <Button
                type="button"
                variant="link"
                className="pl-1 text-indigo-600"
                onClick={handleResendOtp}
              >
                Resend it
              </Button>
            </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OtpModal;
