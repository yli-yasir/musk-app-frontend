import { Box, Heading, Button } from "@chakra-ui/react";
import SubSection from "./SubSection";

export default function Section({ title, subSections }) {
  return (
    <Box mt={8}>
      <Heading size="lg" textAlign="left">
        {title}
      </Heading>
      {subSections.map((subSectionTitle) => (
        <SubSection section={title} title={subSectionTitle} />
      ))}
    </Box>
  );
}
