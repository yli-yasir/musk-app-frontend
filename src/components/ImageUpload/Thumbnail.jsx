import { Box, Image, IconButton } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

export default function Thumbnail({ src, index, onRemove, onLoad }) {
  return (
    <Box position="relative">
      <Image
        src={src}
        height="200px"
        width="200px"
        borderRadius="lg"
        alt="thumbnail"
        onLoad={() => URL.revokeObjectURL(src)}
      />
      <IconButton
        position="absolute"
        top="4px"
        right="4px"
        colorScheme="red"
        aria-label="remove image"
        onClick={() => onRemove()}
        icon={<CloseIcon />}
      />
    </Box>
  );
}
