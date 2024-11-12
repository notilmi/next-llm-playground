"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { AlertCircle, Mail, Sparkles } from "lucide-react";
import React, { useActionState, useEffect } from "react";
import { login } from "./actions";
import { ZodIssue } from "zod";
import toast from "react-hot-toast";
import { getValidationError } from "@/lib/forms/utils";
import { useSearchParams } from "next/navigation";

function LoginPage() {
  // eslint-disable-next-line
  const [loginState, loginAction, loginPending] = useActionState(login, {
    message: "",
    ok: false,
    validation_error: [] as ZodIssue[],
  });

  const searchParams = useSearchParams();
  const auth_error = searchParams.get("error_description");

  useEffect(() => {
    if (loginState && loginState.message) {
      // eslint-disable-next-line
      loginState.ok
        ? toast.success(loginState.message)
        : toast.error(loginState.message);
    }
  }, [loginState]);

  return (
    <div className="flex flex-col space-y-3 max-w-[24rem] m-4">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">Sign in</h1>
        <p className="text-muted-foreground text-lg">
          Enter your email to Sign in
        </p>
      </div>
      <form className="space-y-3" action={loginAction}>
        <div className="flex flex-col gap-1">
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            placeholder="user@acme.com"
            disabled={loginPending}
            error={getValidationError(loginState.validation_error, "email")}
          />
          <span className="text-red-500">
            {getValidationError(loginState.validation_error, "email")}
          </span>
        </div>
        <Button className="w-full" type="submit" loading={loginPending}>
          <Mail className="size-4" />
          Sign In With Email
        </Button>
      </form>
      {auth_error ? (
        <div className="w-full bg-destructive rounded-lg p-4 flex flex-row items-center gap-4 text-destructive-foreground">
          <AlertCircle className="text-destructive-foreground" />
          <p className="text-sm">
            {auth_error ??
              "An Error Occured While Trying To Sign You In, Please Try Again Later"}
          </p>
        </div>
      ) : (
        <></>
      )}

      <div className="w-full bg-muted rounded-lg p-4 flex flex-row items-center gap-4 text-muted-foreground">
        <Sparkles className="text-amber-400" />
        <p className="text-sm">
          We&apos;ll Send A Magic Link For A Passwordless Sign In, You
          Don&apos;t Need To Sign Up
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
