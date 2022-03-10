import Page from "../../components/Page";
import AuthForm from "../../components/AuthForm";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { roles } from "../../contexts/UserContext";
import { Navigate } from "react-router-dom";

export default function LoginPage() {
  const [userContext] = useContext(UserContext);
  return (
    <Page paddingTop={12} px={2} width="100%" maxWidth="700px">
      <AuthForm />
      {userContext.role !== roles.guest && <Navigate to="/" />}
    </Page>
  );
}
