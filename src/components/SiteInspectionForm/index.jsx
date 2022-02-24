import { Heading, Center, Divider, Button } from "@chakra-ui/react";
import Logo from "../Logo";
import Section from "./Section";
export default function SiteInspectionForm() {
  return (
    <Center
      bgColor="gray.500"
      p={4}
      w="100%"
      m={4}
      maxW="700px"
      flexDirection="column"
      borderRadius="lg"
      boxShadow="2xl"
    >
      <Logo />
      <Heading textAlign="center" mt={8}>
        Site Inspection Form
      </Heading>
      <Divider mt={6} borderColor="blue.100" width="70%" />
      <form style={{ width: "100%" }}>
        <Section
          title="A. Working Standards"
          subSections={[
            "1. Work at height",
            "2. Lifting Operations",
            "3. Certification",
            "4. Confined Space Work",
            "5. Electrical Work",
          ]}
        />

        <Section
          title="B. Quality"
          subSections={[
            "1. Work at height",
            "2. Lifting Operations",
            "3. Certification",
            "4. Confined Space Work",
            "5. Electrical Work",
          ]}
        />

        <Section
          title="C. Site Rules"
          subSections={[
            "1. Work at height",
            "2. Lifting Operations",
            "3. Certification",
            "4. Confined Space Work",
            "5. Electrical Work",
          ]}
        />

        <Section
          title="D. Environmental"
          subSections={[
            "1. Work at height",
            "2. Lifting Operations",
            "3. Certification",
            "4. Confined Space Work",
            "5. Electrical Work",
          ]}
        />

        <Section
          title="E. Protection"
          subSections={[
            "1. Work at height",
            "2. Lifting Operations",
            "3. Certification",
            "4. Confined Space Work",
            "5. Electrical Work",
          ]}
        />
        <Button type="submit" m={4}>
          Submit
        </Button>
      </form>
    </Center>
  );
}
