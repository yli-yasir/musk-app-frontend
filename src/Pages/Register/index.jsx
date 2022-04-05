import Page from "../../components/Page";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { roles } from "../../contexts/UserContext";
import { Navigate } from "react-router-dom";
import { useToast, FormControl, Input, Button } from "@chakra-ui/react";
import appFuncs from "../../appFuncs";
import { useAsyncFn } from "react-use";
import { useForm } from "react-hook-form";
import Form from "../../components/Form";

export default function LoginPage() {
  const [userContext] = useContext(UserContext);
  const toast = useToast();
  const { register: registerInput, handleSubmit, formState } = useForm();

  const [, login] = useAsyncFn(async ({ email, password }) => {
    try {
      await appFuncs.register(email, password);
      toast({
        title: "User has been registered!",
        status: "success",
        isClosable: true,
        position: "top",
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
    <Page paddingTop="128px" px={2} width="100%" maxWidth="700px">
      {userContext.role !== roles.admin && <Navigate to="/" />}
      <Form title="Register" onSubmit={handleSubmit(login)}>
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
          loadingText="Registering!"
          isLoading={formState.isSubmitting}
        >
          Register
        </Button>
      </Form>
    </Page>
  );
}
