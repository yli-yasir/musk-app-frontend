import { Box, Heading, Button } from "@chakra-ui/react";

export default function Section({ title, subSections }) {
  return (
    <Box mt={8}>
      <Heading size="lg" textAlign="left">
        {title}
      </Heading>
      {subSections.map((subSection) => (
        <></>
      ))}
    </Box>
  );
}
