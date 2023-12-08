import { useState } from "react";
import { ZodError, ZodObject, ZodRawShape } from "zod";

export function useValidation<T>(schema: ZodObject<ZodRawShape>) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(formData: T) {
    const response = schema.safeParse(formData);
    if (!response.success) {
      setErrors(parseErrors(response.error));
      return null;
    }

    setErrors({});
    return response.data as T;
  }

  return { errors, validate };
}

function parseErrors(rawErrors: ZodError) {
  const errors = {} as Record<string, string>;
  const formattedErrors = rawErrors.format() as Record<string, any>;

  for (const key in formattedErrors) {
    if (!formattedErrors[key]?._errors) continue;
    errors[key] = formattedErrors[key]?._errors[0];
  }

  return errors;
}
