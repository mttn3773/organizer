import React, { InputHTMLAttributes } from "react";
import { ErrorMessage, useField } from "formik";
import { FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react";
import { toCapitalize } from "../../utils/toCapitalize";
type InputFieldProps = InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement
> & {
  type: string;
  isTextArea?: boolean;
  withLabel?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
  type,
  isTextArea = false,
  withLabel = true,
  ...props
}) => {
  const [field] = useField(props as any);
  return (
    <FormControl id={field.name}>
      {withLabel && <FormLabel>{toCapitalize(field.name)}</FormLabel>}
      <ErrorMessage name={field.name} component="div" className="error-text" />
      {!isTextArea ? (
        <Input
          bgColor="whiteAlpha.500"
          borderColor="blue.300"
          _hover={{ borderColor: "blue.500" }}
          {...field}
          type={type}
        />
      ) : (
        <Textarea
          bgColor="whiteAlpha.500"
          borderColor="blue.300"
          _hover={{ borderColor: "blue.500" }}
          {...field}
          type={type}
        />
      )}
    </FormControl>
  );
};
