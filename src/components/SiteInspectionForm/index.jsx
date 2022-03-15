import {
  Button,
  Box,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Form from "../Form";
import Section from "./Section";
import { useAsync } from "react-use";
import appFuncs from "../../appFuncs";

export default function SiteInspectionForm() {
  const { register: registerInput, handleSubmit } = useForm();

  // need to handle case where fetch fails
  const { value: sections } = useAsync(
    async () => appFuncs.getInspectionFormSections(),
    []
  );

  const handleFormSubmit = handleSubmit((data) => {
    alert(JSON.stringify(data));
  });

  return (
    <Form maxWidth="800px" onSubmit={handleFormSubmit}>
      <Accordion allowToggle>
        {sections?.map(({ name, subSections }) => (
          <AccordionItem key={name}>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  {name}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Section
                registerInput={registerInput}
                title={name}
                subSections={subSections}
              />
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
      <Button type="submit" m={4}>
        Submit
      </Button>
    </Form>
  );
}
