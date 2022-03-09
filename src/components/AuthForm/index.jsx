import Form from "../Form";
import { Button, Input, FormControl } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const submissionHandler = (data) => {
  alert(JSON.stringify(data));
};

export default function AuthForm() {
  const { register: registerInput, handleSubmit } = useForm();

  return (
    <Form title="Login" onSubmit={handleSubmit(submissionHandler)}>
      <FormControl>
        <Input
          placeholder="Email"
          type="email"
          mb={4}
          {...registerInput("email")}
        />
      </FormControl>

      <FormControl>
        <Input
          placeholder="Password"
          type="password"
          mb={4}
          {...registerInput("password")}
        />
      </FormControl>

      <Button type="submit" w="100%" colorScheme="blue">
        Login
      </Button>
    </Form>
  );
}
