import { Button, CircularProgress, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import moment from "moment";
import React, { useContext } from "react";
import { config } from "../../config/config";
import { useHttp } from "../../hooks/useHttp";
import { ITask } from "../../interfaces/tasks.interface";
import { GlobalState } from "../../store/globalStore";
import { toErrorMap } from "../../utils/toErrorsMap";
import { InputField } from "./InputField";
interface CreateTaskFormProps {
  date: moment.Moment;
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
}

export const CreateTaskForm: React.FC<CreateTaskFormProps> = ({
  date,
  setTasks,
}) => {
  const { state } = useContext(GlobalState);
  const { request } = useHttp();
  return (
    <Formik
      initialValues={{ title: "", description: "", date: "" }}
      onSubmit={async (values, { setErrors, resetForm }) => {
        try {
          if (!values.date) {
            return setErrors({ date: "Invalid date" });
          }
          const minutes = parseInt(values.date.split(":")[1]);
          const hours = parseInt(values.date.split(":")[0]);
          const dateString = date
            .clone()
            .set("minutes", minutes)
            .set("hours", hours)
            .set("seconds", 0)
            .toISOString();
          const res = await request({
            url: config.server.endpoints.tasks,
            method: "POST",
            body: { ...values, date: dateString },
            toastErorrs: true,
          });
          if (res.success && res.task) {
            setTasks((prev) => [...prev, res.task]);
            return resetForm();
          }
          const mappedErrors = toErrorMap(res.errors);
          if (mappedErrors) setErrors(mappedErrors);
        } catch (errors) {
          resetForm();
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
            <InputField type="time" name="date" />
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
