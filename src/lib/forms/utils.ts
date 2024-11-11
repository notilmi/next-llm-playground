import { ZodIssue } from "zod";

export function getValidationError(
  error: ZodIssue[] | undefined,
  key: string
): string | undefined {
  if (!error) return undefined;

  const message = error.find((error) => error.path.includes(key))?.message;
  return message;
}
