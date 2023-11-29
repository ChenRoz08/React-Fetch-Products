import { useState } from "react";
import { ZodObject, ZodRawShape, ZodError } from "zod";

export function useValidation<T>(schema: ZodObject<ZodRawShape>) {
  const [data, setData] = useState<T | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(formData: T) {
    setErrors({});
    setData(null);

    const response = schema.safeParse(formData);

    if (!response.success) {
      setErrors(parseErrors(response.error));
      return false;
    }

    setData(response.data as T);
    return true;
  }

  return { data, errors, validate };
}

function parseErrors(rawErrors: ZodError) {
  const errors = {} as Record<string, string>;
  const formattedErrors = rawErrors.format() as Record<string, any>;

  for (const key in formattedErrors) {
    errors[key] = formattedErrors[key]._errors[0];
  }

  return errors;
}
