import {
  Button,
  Box,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import Form from "../Form";
import Section from "./Section";
import { useAsync } from "react-use";
import appFuncs from "../../appFuncs";
import camelCase from "lodash.camelcase";

export default function SiteInspectionForm() {
  const methods = useForm();
  const { handleSubmit } = methods;

  // need to handle case where fetch fails
  const { value: sections } = useAsync(
    async () => appFuncs.getInspectionFormSections(),
    []
  );

  const handleFormSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <FormProvider {...methods}>
      <Form maxWidth="800px" onSubmit={handleFormSubmit}>
        <Accordion allowToggle>
          {sections?.map(({ name: title, subSections }) => (
            <AccordionItem key={title}>
              <h2>
                <AccordionButton fontWeight="bold">
                  <Box flex="1" textAlign="left">
                    {title}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Section
                  title={title}
                  subSections={subSections}
                  name={camelCase(title)}
                />
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
        <Button type="submit" m={4}>
          Submit
        </Button>
      </Form>
    </FormProvider>
  );
}
