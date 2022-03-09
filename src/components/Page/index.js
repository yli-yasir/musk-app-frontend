import { Center } from "@chakra-ui/react";

export default function Page(props) {
  return (
    <Center
      minH="100vh"
      flexDirection="column"
      justifyContent="flex-start"
      {...props}
    />
  );
}
