import { Button, CircularProgress, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { useHttp } from "../../hooks/useHttp";
import { GlobalState } from "../../store/globalStore";
import { toErrorMap } from "../../utils/toErrorsMap";
import { InputField } from "./InputField";
interface UserFormProps {
  url: string;
}

export const UserForm: React.FC<UserFormProps> = ({ url }) => {
  const { request } = useHttp();
  const { dispatch } = useContext(GlobalState);

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={async (values, { setErrors }) => {
        try {
          const res = await request({
            url,
            method: "POST",
            body: values,
            toastErorrs: false,
          });
          if (res.accessToken) {
            dispatch({ type: "SET_AUTH", payload: true });
            return <Redirect to="/" />;
          }
          const mappedErrors = toErrorMap(res.errors);
          if (mappedErrors) return setErrors(mappedErrors);
        } catch (errors) {
          return setErrors(toErrorMap(errors));
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Flex
            m="0 auto"
            justifyItems="center"
            direction="column"
            gridGap="2rem"
            alignItems="center"
            width="60%"
          >
            <InputField type="email" name="email" />
            <InputField type="password" name="password" />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <CircularProgress
                  size="2rem"
                  color="green.500"
                  isIndeterminate
                />
              ) : (
                "Submit"
              )}
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};
