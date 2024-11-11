import { ZodIssue } from "zod";

export type ActionResponse = {
  ok: boolean;
  message: string;
  validation_error: ZodIssue[];
};
