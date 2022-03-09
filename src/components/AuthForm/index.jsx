import Form from "../Form";
import { Button, Input, FormControl, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import appFuncs from "../../appFuncs";
import { useAsyncFn } from "react-use";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

export default function AuthForm() {
  const { register: registerInput, handleSubmit, formState } = useForm();

  const [, setUserContext] = useContext(UserContext);

  const toast = useToast();

  const [, login] = useAsyncFn(async ({ email, password }) => {
    try {
      const { name, role } = await appFuncs.login(email, password);
      setUserContext({
        name,
        email,
        role,
      });
    } catch (error) {
      toast({
        title: error.message,
        status: "error",
        isClosable: true,
        position: "top",
      });
    }
  }, []);

  return (
    <Form title="Login" onSubmit={handleSubmit(login)}>
      <FormControl>
        <Input
          placeholder="Email"
          type="email"
          mb={4}
          {...registerInput("email")}
          required
        />
      </FormControl>

      <FormControl>
        <Input
          placeholder="Password"
          type="password"
          mb={4}
          {...registerInput("password")}
          required
        />
      </FormControl>

      <Button
        type="submit"
        w="100%"
        colorScheme="blue"
        loadingText="Logging in!"
        isLoading={formState.isSubmitting}
      >
        Login
      </Button>
    </Form>
  );
}
