import { IError } from "../interfaces/errors.interface";

export const toErrorMap = (errors: IError[]): Record<string, string> => {
  const mappedErrors: Record<string, string> = {};

  errors.map((error) => {
    if (error.param) mappedErrors[error.param] = error.msg;
    return;
  });

  return mappedErrors;
};
