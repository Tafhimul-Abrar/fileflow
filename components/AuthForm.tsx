"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createAccount, signInUser } from "@/lib/actions/user.actions";
import OtpModal from "@/components/OTPModal";
import { Loader2 } from "lucide-react";

type FormType = "sign-in" | "sign-up";

const authFormSchema = (formType: FormType) => {
  return z.object({
    email: z.string().email("Enter a valid email address."),
    fullName:
      formType === "sign-up"
        ? z.string().min(2, "Enter at least 2 characters.").max(50)
        : z.string().optional(),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [accountId, setAccountId] = useState<string | null>(null);

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      if (type === "sign-up") {
        const user = await createAccount({
          fullName: values.fullName || "",
          email: values.email,
        });

        if (user?.error === "ACCOUNT_EXISTS") {
          setErrorMessage(
            "An account already exists with that email. Sign in instead.",
          );
          return;
        }

        if (!user?.accountId) {
          setErrorMessage("We couldn't create your account. Please try again.");
          return;
        }

        setAccountId(user.accountId);
      } else {
        const user = await signInUser({ email: values.email });

        if (!user?.accountId) {
          setErrorMessage(
            "No account was found with that email. Create an account first, then sign in.",
          );
          return;
        }

        setAccountId(user.accountId);
      }
    } catch {
      setErrorMessage(
        type === "sign-up"
          ? "We couldn't create your account. Please try again."
          : "We couldn't send your sign-in code. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <Link href="/" className="mb-8 inline-flex items-center gap-3">
            <Image src="/assets/icons/fileflow-mark.svg" alt="FileFlow" width={40} height={40} />
            <Image src="/assets/icons/fileflow-logo.svg" alt="FileFlow" width={132} height={28} className="h-auto" />
          </Link>

          <div className="mb-6 space-y-2">
            <h1 className="text-3xl font-semibold text-slate-900">
              {type === "sign-in" ? "Welcome back" : "Create your workspace"}
            </h1>
            <p className="text-sm text-slate-500">
              {type === "sign-in"
                ? "Enter your email and we’ll send a one-time code to continue."
                : "Start using FileFlow to keep your documents, images, and media organized."}
            </p>
          </div>

          <div className="space-y-4">
            {type === "sign-up" && (
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-slate-700">Full name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" className="h-12 rounded-2xl border-slate-200 bg-slate-50" {...field} />
                    </FormControl>
                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-slate-700">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" className="h-12 rounded-2xl border-slate-200 bg-slate-50" {...field} />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />
          </div>

          {errorMessage && (
            <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              {errorMessage}
              {type === "sign-in" ? (
                <Link href="/sign-up" className="ml-1 font-semibold text-indigo-600">
                  Create account
                </Link>
              ) : errorMessage.includes("already exists") ? (
                <Link href="/sign-in" className="ml-1 font-semibold text-indigo-600">
                  Sign in
                </Link>
              ) : null}
            </div>
          )}

          <Button type="submit" className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-slate-900 text-white hover:bg-slate-800" disabled={isLoading}>
            {isLoading ? <Loader2 className="size-4 animate-spin" /> : null}
            {type === "sign-in" ? "Send sign-in code" : "Create account"}
          </Button>

          <p className="mt-5 text-center text-sm text-slate-500">
            {type === "sign-in" ? "Don't have an account?" : "Already have an account?"}
            <Link href={type === "sign-in" ? "/sign-up" : "/sign-in"} className="ml-1 font-semibold text-indigo-600">
              {type === "sign-in" ? "Sign up" : "Sign in"}
            </Link>
          </p>
        </form>
      </Form>

      {accountId && <OtpModal accountId={accountId} email={form.getValues("email")} />}
    </>
  );
};

export default AuthForm;
