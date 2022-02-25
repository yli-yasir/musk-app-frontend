import { Box, Heading, Button } from "@chakra-ui/react";
import SubSection from "./SubSection";

export default function Section({ title, subSections, registerInput }) {
  return (
    <Box mt={8}>
      <Heading size="lg" textAlign="left">
        {title}
      </Heading>
      {subSections.map((subSectionTitle) => (
        <SubSection
          registerInput={registerInput}
          section={title}
          title={subSectionTitle}
        />
      ))}
    </Box>
  );
}
