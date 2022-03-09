import Page from "../../components/Page";
import AuthForm from "../../components/AuthForm";
import { Fade, ScaleFade, Slide } from "@chakra-ui/react";
export default function LoginPage() {
  return (
    <Page paddingTop={12} px={2}>
      <AuthForm />
    </Page>
  );
}
