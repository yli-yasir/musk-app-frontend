import { Box, Textarea, Badge, Checkbox, IconButton } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import ImageUpload from "../ImageUpload";

export default function InpsectionAct({
  section,
  subsection,
  name,
  actType,
  onRemove,
}) {
  const { register } = useFormContext();

  const [resolved, setResolved] = useState(false);
  const colors = getColors(actType);

  return (
    <Box bgColor={colors.light} shadow="lg" my={2} position="relative">
      <IconButton
        position="absolute"
        top="4px"
        right="4px"
        size="sm"
        colorScheme="red"
        aria-label="remove image"
        onClick={() => onRemove()}
        icon={<CloseIcon />}
      />
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
          {...register(`${name}.description`)}
        />
        <Checkbox
          colorScheme={colors.scheme}
          isChecked={resolved}
          {...register(`${name}.isResolved`)}
          onChange={(e) => setResolved(e.target.checked)}
        >
          Resolved
        </Checkbox>
        {resolved && (
          <Textarea
            bgColor="white"
            placeholder="Resolution"
            my={4}
            {...register(`${name}.resolution`)}
          />
        )}

        <ImageUpload name={`${name}.images`} />
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
