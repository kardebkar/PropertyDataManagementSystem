// FieldData.ts
import { FieldError, RegisterOptions } from "react-hook-form";

export type FieldData = {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  registerOptions: RegisterOptions;
  error: FieldError | undefined;
};
