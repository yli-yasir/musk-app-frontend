import { Button, Accordion, Box } from "@chakra-ui/react";
import BriefAccordionItem from "../BriefAccordionItem";
import { FormProvider, useForm } from "react-hook-form";
import usePDF from "./usePDF";
import Form from "../Form";
import Section from "./Section";
import { useAsync } from "react-use";
import appFuncs from "../../appFuncs";
import camelCase from "lodash.camelcase";

export default function SiteInspectionForm() {
  const methods = useForm();
  const { handleSubmit, getValues } = methods;

  // need to handle case where fetch fails
  const { value: sections } = useAsync(
    async () => appFuncs.getInspectionFormSections(),
    []
  );

  const [PDFBlobURL, setPDFInputData] = usePDF(sections);

  const handleFormSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <FormProvider {...methods}>
      <Form
        maxWidth="800px"
        onSubmit={handleFormSubmit}
        title={"Inspection Form"}
      >
        <Accordion allowToggle>
          {sections?.map(({ title, subSections }) => (
            <BriefAccordionItem key={title} title={title}>
              <Section
                title={title}
                subSections={subSections}
                name={camelCase(title)}
              />
            </BriefAccordionItem>
          ))}
          <BriefAccordionItem
            title="Report Overview"
            onClick={() => setPDFInputData(getValues())}
          >
            <Box
              as="iframe"
              bgColor="gray.200"
              mt={4}
              w="100%"
              h="600px"
              src={PDFBlobURL}
            ></Box>
          </BriefAccordionItem>
        </Accordion>
        <Button type="submit" m={4}>
          Submit
        </Button>
      </Form>
    </FormProvider>
  );
}
