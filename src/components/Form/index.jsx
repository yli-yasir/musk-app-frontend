import { Divider, Heading } from "@chakra-ui/react";
import Logo from "../Logo";
import Paper from "../Paper";

// TODO replace the inline-style
export default function Form({ title, children, ...props }) {
  return (
    <Paper>
      <Logo width="50%" />
      <Heading textAlign="center" mt={6} size="xl">
        {title}
      </Heading>
      <Divider mt={4} mb={8} width="50%" borderColor="blackAlpha.400" />
      <form style={{ width: "100%" }} {...props}>
        {children}
      </form>
    </Paper>
  );
}
