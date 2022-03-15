import ImageUpload from "./index";
import Form from "../Form";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@chakra-ui/react";
export default {
  title: "Components/ImageUpload",
  component: ImageUpload,
};

const Template = (args) => {
  const methods = useForm();
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit((data) => console.log(data))}>
        <ImageUpload {...args} />
        <Button type="submit">Submit</Button>
      </Form>
    </FormProvider>
  );
};

export const Primary = Template.bind({});
