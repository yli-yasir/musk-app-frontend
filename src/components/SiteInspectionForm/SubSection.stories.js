import SubSection from "./SubSection";
import Form from "../Form";
import { useForm, FormProvider } from "react-hook-form";
import { Button, List } from "@chakra-ui/react";
export default {
  title: "Components/SubSection",
  component: SubSection,
};

const Template = (args) => {
  const methods = useForm();
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit((data) => console.log(data))}>
        <List>
          <SubSection
            section="cooking"
            title="frying"
            name={"cooking.frying"}
            {...args}
          />
        </List>
        <Button type="submit">Submit</Button>
      </Form>
    </FormProvider>
  );
};

export const Primary = Template.bind();
