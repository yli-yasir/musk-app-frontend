import { Center } from "@chakra-ui/react";

export default function Paper(props) {
  return (
    <Center
      bgColor="white"
      w="100%"
      flexDirection="column"
      borderRadius="lg"
      shadow="2xl"
      {...props}
    />
  );
}
