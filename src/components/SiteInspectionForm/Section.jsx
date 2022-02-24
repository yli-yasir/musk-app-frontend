import { Box, Heading, Button, Textarea, Checkbox } from "@chakra-ui/react";

export default function Section({ title, subSections }) {
  return (
    <Box mt={8}>
      <Heading size="lg" textAlign="left">
        {title}
      </Heading>
      {subSections.map((subSection) => (
        <>
          <Heading size="md" mt={4}>
            {subSection}
          </Heading>
          <Textarea bgColor="white" placeholder="Description" my={4} />
          <Checkbox>Resolved</Checkbox>
          <Textarea bgColor="white" placeholder="Resolution" my={4} />
          <Button m={4} bgColor="yellow.200">
            Add Intervention
          </Button>
          <Button bgColor="green.200">Add Commendation</Button>
        </>
      ))}
    </Box>
  );
}
