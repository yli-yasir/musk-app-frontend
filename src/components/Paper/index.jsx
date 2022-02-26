import Center from "@chakra-ui/react";

export default function Paper(props) {
  return (
    <Center
      bgColor="white"
      p={4}
      w="100%"
      m={4}
      maxW="700px"
      flexDirection="column"
      borderRadius="lg"
      shadow="2xl"
      {...props}
    />
  );
}
