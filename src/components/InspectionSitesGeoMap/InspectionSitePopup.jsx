import { Box, Heading, Badge, ChakraProvider, Button } from "@chakra-ui/react";
import routePaths from "../../routePaths";

const badgeProps = {
  display: "block",
  mb: 4,
};
export default function Popup({
  title,
  inspectionCount,
  interventionCount,
  commendationCount,
}) {
  return (
    <ChakraProvider>
      <Box textAlign="center" p={4}>
        <Heading size="sm" mb={4} textStyle="italic">
          {title}
        </Heading>
        <Badge colorScheme="purple" {...badgeProps}>
          {inspectionCount} Inspections
        </Badge>
        <Badge colorScheme="yellow" {...badgeProps}>
          {interventionCount} Interventions
        </Badge>
        <Badge colorScheme="green" {...badgeProps}>
          {commendationCount} Commendations
        </Badge>
      </Box>
    </ChakraProvider>
  );
}
