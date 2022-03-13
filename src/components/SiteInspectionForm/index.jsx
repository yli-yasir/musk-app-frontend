import { Button, Flex } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Form from "../Form";
import Section from "./Section";
import { Step, Steps, useSteps } from "chakra-ui-steps";

const steps = [
  { label: "Step 1", content: <div>hello 1</div> },
  { label: "Step 2", content: <div>hello 2</div> },
  { label: "Step 3", content: <div>hello 3</div> },
];

export default function SiteInspectionForm() {
  const { register: registerInput, handleSubmit } = useForm();

  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  const handleFormSubmit = handleSubmit((data) => {
    alert(JSON.stringify(data));
  });

  return (
    <Form>
      <Steps activeStep={activeStep} orientation="vertical">
        {steps.map(({ label, content }) => (
          <Step label={label} key={label}>
            {content}
          </Step>
        ))}
      </Steps>

      <Button type="submit" m={4}>
        Submit
      </Button>
    </Form>
  );
}

{
  /* <Heading textAlign="center" mt={8}>
Site Inspection Form
</Heading>
<Divider mt={6} borderColor="blue.100" width="70%" />
<form style={{ width: "100%" }} onSubmit={handleFormSubmit}>
<Section
  registerInput={registerInput}
  title="Working Standards"
  subSections={[
    "Work at height",
    "Lifting Operations",
    "Certification",
    "Confined Space Work",
    "Electrical Work",
  ]}
/>

<Button type="submit" m={4}>
  Submit
</Button>
</form> */
}
