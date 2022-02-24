import { Box, Textarea, Badge, Checkbox } from "@chakra-ui/react";
import { useState } from "react";

function getColors(actType) {
  const scheme = actType === "commendation" ? "green" : "yellow";
  return {
    scheme,
    light: `${scheme}.200`,
    dark: `${scheme}.300`,
  };
}

export default function InpsectionAct({ actType, ...props }) {
  const [resolved, setResolved] = useState(false);
  const colors = getColors(actType);

  return (
    <Box bgColor={colors.light} shadow="lg" my={2}>
      <Box bgColor={colors.dark} p={2}>
        <Badge variant="solid" colorScheme={colors.scheme}>
          {actType}
        </Badge>
      </Box>
      <Box p={2}>
        <Textarea bgColor="white" placeholder="Description" my={4} />
        <Checkbox
          colorScheme={colors.scheme}
          isChecked={resolved}
          onChange={(e) => setResolved(e.target.checked)}
        >
          Resolved
        </Checkbox>
        {resolved && (
          <Textarea bgColor="white" placeholder="Resolution" my={4} />
        )}
      </Box>
    </Box>
  );
}
