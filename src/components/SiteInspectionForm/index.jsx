import { Button, Box } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Form from "../Form";
import Section from "./Section";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { useAsync } from "react-use";
import appFuncs from "../../appFuncs";

export default function SiteInspectionForm() {
  const { register: registerInput, handleSubmit } = useForm();

  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  // need to handle case where fetch fails
  const { value: sections } = useAsync(
    async () => appFuncs.getInspectionFormSections(),
    []
  );

  const handleFormSubmit = handleSubmit((data) => {
    alert(JSON.stringify(data));
  });

  return (
    <Form maxWidth="800px">
      {sections && (
        <>
          <Steps activeStep={activeStep} orientation="vertical">
            {sections.map(({ name, subSections }) => (
              <Step label={name} key={name}>
                <Section
                  registerInput={registerInput}
                  title={name}
                  subSections={subSections}
                />
              </Step>
            ))}
          </Steps>
          <Box display="flex" flexDirection="row-reverse" columnGap={4}>
            <Button
              onClick={() => nextStep()}
              disabled={activeStep === sections.length - 1}
            >
              Next
            </Button>
            <Button onClick={() => prevStep()} disabled={activeStep === 0}>
              Previous
            </Button>
          </Box>
        </>
      )}

      <Button type="submit" m={4}>
        Submit
      </Button>
    </Form>
  );
}
