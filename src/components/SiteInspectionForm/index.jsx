import { Button, Accordion, Box } from "@chakra-ui/react";
import BriefAccordionItem from "../BriefAccordionItem";
import { FormProvider, useForm } from "react-hook-form";
import usePDF from "./usePDF";
import Form from "../Form";
import Section from "./Section";
import { useAsync } from "react-use";
import appFuncs from "../../appFuncs";
import camelCase from "lodash.camelcase";
import { useNavigate, useParams } from "react-router-dom";

export default function SiteInspectionForm() {
  const methods = useForm();
  const { siteId } = useParams();
  const { handleSubmit, getValues, formState } = methods;
  const navigate = useNavigate();
  // need to handle case where fetch fails
  const { value: sections } = useAsync(
    async () => appFuncs.getInspectionFormSections(),
    []
  );

  const {
    blobURL: PDFBlobURL,
    setInputData: setPDFInputData,
    blob: PDFBlob,
  } = usePDF(sections);

  const handleFormSubmit = handleSubmit(async (data) => {
    let interventionCount = 0;
    let commendationCount = 0;
    for (const section of Object.values(data)) {
      for (const subsection of Object.values(section)) {
        for (const interventionAct of subsection) {
          interventionAct.actType === "intervention"
            ? interventionCount++
            : commendationCount++;
        }
      }
    }

    const submission = {
      interventionCount,
      commendationCount,
      siteId: parseInt(siteId),
      reportFile: new File([PDFBlob], "report", { type: "pdf" }),
    };
    await appFuncs.submitInspection(submission);
    navigate("/");
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
        <Button type="submit" m={4} isLoading={formState.isSubmitting}>
          Submit
        </Button>
      </Form>
    </FormProvider>
  );
}
