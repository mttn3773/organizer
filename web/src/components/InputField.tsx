import React, { InputHTMLAttributes } from "react";
import { ErrorMessage, useField } from "formik";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { toCapitalize } from "../utils/toCapitalize";
type InputFieldProps = InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement
> & {
  type: string;
  withLabel?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
  type,
  withLabel = true,
  ...props
}) => {
  const [field, { error }] = useField(props as any);
  return (
    <FormControl id={field.name}>
      {withLabel && <FormLabel>{toCapitalize(field.name)}</FormLabel>}
      <ErrorMessage name={field.name} component="div" className="error-text" />
      <Input {...field} type={type} />
    </FormControl>
  );
};
