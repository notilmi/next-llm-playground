"use server";

import { createClient } from "@/lib/supabase/server";
import { ActionResponse } from "@/lib/types";
import { z, ZodError, ZodIssue } from "zod";

const loginSchema = z.object({
  email: z.string().email("Must be a valid email"),
});

// eslint-disable-next-line
export async function login(state: any, formData: FormData) {
  try {
    const supabase = await createClient();
    const payload = Object.fromEntries(formData);
    const validatedPayload = loginSchema.parse(payload);

    const { error } = await supabase.auth.signInWithOtp({
      email: validatedPayload.email,
    });

    if (error)
      return {
        ok: false,
        message: "Please Try Again Later",
        validation_error: [] as ZodIssue[],
      };

    return {
      ok: true,
      message: "Successfully Sent The Link, Please Check Your Email",
      validation_error: [] as ZodIssue[],
    };
  } catch (error) {
    console.error(error);

    if (error instanceof ZodError)
      return {
        ok: false,
        message: "Invalid Form",
        validation_error: error.issues,
      } satisfies ActionResponse;

    return {
      ok: false,
      message: "Error Has Occured, Please Try Again Later",
      validation_error: [] as ZodIssue[],
    };
  }
}
