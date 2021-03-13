import { Button, CircularProgress, Flex } from "@chakra-ui/react";
import { Form, Formik, FormikHelpers } from "formik";
import moment from "moment";
import React, { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { config } from "../../config/config";
import { useHttp } from "../../hooks/useHttp";
import { ICreateTask, ITask } from "../../interfaces/tasks.interface";
import { GlobalState } from "../../store/globalStore";
import { toErrorMap } from "../../utils/toErrorsMap";
import { InputField } from "./InputField";
interface CreateTaskFormProps {
  date: moment.Moment;
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
  hadnleClose: () => void;
  initialValues?: ICreateTask;
  isUpdating?: boolean;
  taskId?: string;
  bgColor?: string;
}

export const TaskForm: React.FC<CreateTaskFormProps> = ({
  date,
  setTasks,
  initialValues = { title: "", description: "", date: "" },
  isUpdating = false,
  taskId,
  hadnleClose,
  bgColor = "blue.100",
}) => {
  const { state } = useContext(GlobalState);
  const { request } = useHttp();
  const formatedInitialDate = initialValues.date
    ? moment(initialValues.date).format("HH:mm")
    : "";
  const handleSubmit = async (
    values: ICreateTask,
    { setErrors }: FormikHelpers<ICreateTask>
  ) => {
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
        url:
          isUpdating && taskId
            ? config.server.endpoints.findById(taskId)
            : config.server.endpoints.tasks,
        method: isUpdating ? "PUT" : "POST",
        body: { ...values, date: dateString },
        toastErorrs: true,
      });
      if (res.success && res.task) {
        if (isUpdating)
          setTasks((prev) => prev.filter((task) => task._id !== taskId));
        hadnleClose();
        setTasks((prev) => [...prev, res.task]);
        return;
      }
      const mappedErrors = toErrorMap(res.errors);
      if (mappedErrors) setErrors(mappedErrors);
    } catch (errors) {
      return setErrors(toErrorMap(errors));
    }
  };
  return (
    <Flex bgColor={bgColor} w="100%" justifyContent="center">
      <Formik
        initialValues={{ ...initialValues, date: formatedInitialDate }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Flex
              pt="1rem"
              pb="1rem"
              m="0 auto"
              justifyItems="center"
              direction="column"
              alignItems="center"
              width="100%"
              position="relative"
            >
              <Flex
                position="absolute"
                top="4px"
                right="2px"
                cursor="pointer"
                color="red.500"
                zIndex="999"
                onClick={hadnleClose}
              >
                <AiOutlineClose size="1.4rem" />
              </Flex>
              <InputField type="text" name="title" />
              <InputField isTextArea={true} type="text" name="description" />
              <InputField type="time" name="date" />
              <Button
                colorScheme="blue"
                mt="1rem"
                type="submit"
                disabled={isSubmitting || state.loading}
              >
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
    </Flex>
  );
};
