import Paper from "../Paper";
import Form from "../Form";
import { Button, Input } from "@chakra-ui/react";
import Logo from "../Logo";

export default function AuthForm() {
  return (
    <Paper>
      <Logo mb={6} />
      <Form>
        <Input placeholder="Email" mb={4} />
        <Input placeholder="Password" mb={4} />
        <Button>Login</Button>
      </Form>
    </Paper>
  );
}
