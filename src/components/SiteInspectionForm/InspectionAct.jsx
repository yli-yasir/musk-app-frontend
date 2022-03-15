import {
  Box,
  Textarea,
  Badge,
  Checkbox,
  Button,
  Input,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useRef, useState } from "react";

export default function InpsectionAct({
  section,
  subsection,
  index,
  registerInput,
  actType,
  ...props
}) {
  const [resolved, setResolved] = useState(false);
  const colors = getColors(actType);

  const registerField = (fieldName) =>
    registerInput(`${section}[${index}].${fieldName}`);

  const evidenceInputRef = useRef();
  const { ref: evidenceInputCallbackRef, ...evidenceInputProps } =
    registerField("evidence");

  return (
    <Box bgColor={colors.light} shadow="lg" my={2}>
      <Box bgColor={colors.dark} p={2}>
        <Badge variant="solid" colorScheme={colors.scheme} mr={2}>
          {section}
        </Badge>
        <Badge variant="solid" colorScheme={colors.scheme} mr={2}>
          {subsection}
        </Badge>
        <Badge variant="solid" colorScheme={colors.scheme}>
          {actType}
        </Badge>
      </Box>
      <Box p={2}>
        <Textarea
          bgColor="white"
          placeholder="Description"
          my={4}
          {...registerField("description")}
        />
        <Checkbox
          colorScheme={colors.scheme}
          isChecked={resolved}
          {...registerField("resolved")}
          onChange={(e) => setResolved(e.target.checked)}
        >
          Resolved
        </Checkbox>
        {resolved && (
          <Textarea
            bgColor="white"
            placeholder="Resolution"
            my={4}
            {...registerField("resolution")}
          />
        )}
        <Box display="flex" flexDirection="row-reverse">
          <Button
            size="sm"
            leftIcon={<AddIcon />}
            onClick={() => {
              evidenceInputRef.current.click();
            }}
          >
            Evidence
          </Button>
          <Input
            type="file"
            ref={(el) => {
              evidenceInputCallbackRef(el);
              evidenceInputRef.current = el;
            }}
            {...evidenceInputProps}
          />
        </Box>
      </Box>
    </Box>
  );
}

function getColors(actType) {
  const scheme = actType === "commendation" ? "green" : "yellow";
  return {
    scheme,
    light: `${scheme}.200`,
    dark: `${scheme}.300`,
  };
}
