import { Box, Divider, Heading } from "@chakra-ui/react";
import Logo from "../Logo";
import Paper from "../Paper";

// TODO replace the inline-style
export default function Form({ title, children, maxWidth, ...props }) {
  return (
    <Paper maxWidth={maxWidth}>
      <Logo width="50%" />
      <Heading textAlign="center" mt={6} size="xl">
        {title}
      </Heading>
      <Divider mt={4} mb={8} width="50%" borderColor="blackAlpha.400" />
      <Box as="form" w="100%" {...props}>
        {children}
      </Box>
    </Paper>
  );
}
