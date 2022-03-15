import { Box, Heading, List } from "@chakra-ui/react";
import SubSection from "./SubSection";

export default function Section({ title, subSections }) {
  return (
    <Box mt={8} textAlign="left" bgColor="gray.100" p={4} borderRadius="xl">
      <Heading size="lg" textAlign="center" mb={4}>
        {title}
      </Heading>
      <List>
        {subSections.map((subSectionTitle) => (
          <SubSection
            key={subSectionTitle}
            section={title}
            title={subSectionTitle}
          />
        ))}
      </List>
    </Box>
  );
}
