import { Heading, Center, Divider, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Logo from "../Logo";
import Section from "./Section";

export default function SiteInspectionForm() {
  const { register: registerInput, handleSubmit } = useForm();

  const handleFormSubmit = handleSubmit((data) => {
    alert(JSON.stringify(data));
  });

  return (
    <Center
      bgColor="white"
      p={4}
      w="100%"
      m={4}
      maxW="700px"
      flexDirection="column"
      borderRadius="lg"
      shadow="2xl"
    >
      <Logo />
      <Heading textAlign="center" mt={8}>
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
      </form>
    </Center>
  );
}
