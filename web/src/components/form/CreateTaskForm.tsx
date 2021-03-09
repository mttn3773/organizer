import { Button, CircularProgress, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { useHttp } from "../../hooks/useHttp";
import { GlobalState } from "../../store/globalStore";
import { toErrorMap } from "../../utils/toErrorsMap";
import { InputField } from "./InputField";
import { config } from "../../config/config";
interface CreateTaskFormProps {}

export const CreateTaskForm: React.FC<CreateTaskFormProps> = ({}) => {
  const { dispatch, state } = useContext(GlobalState);
  const { request } = useHttp();
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={async (values, { setErrors }) => {
        try {
          const res = await request({
            url: config.server.endpoints.tasks,
            method: "POST",
            body: values,
            toastErorrs: false,
          });

          const mappedErrors = toErrorMap(res.errors);
          if (mappedErrors) setErrors(mappedErrors);
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
            <InputField type="text" name="title" />
            <InputField type="text" name="description" />
            <InputField type="time" name="password" />
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
