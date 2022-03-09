import LoginPage from "./Pages/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import routePaths from "./routePaths";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import UserContext, { roles } from "./contexts/UserContext";
import { useState } from "react";

export default function App() {
  const [userContext, setUserContext] = useState({
    name: "anon",
    email: "anon@musk.com",
    role: roles.guest,
  });
  return (
    <UserContext.Provider value={[userContext, setUserContext]}>
      <ChakraProvider value={theme}>
        <Router>
          <Routes>
            <Route path={routePaths.login} element={<LoginPage />} />
            <Route path="*" element={<div>Nothing to see here! 😨😨😨</div>} />
            <Route
              path="/"
              element={<GuardedApp userRole={userContext.role} />}
            >
              <Route index element={<div>root</div>} />
            </Route>
          </Routes>
        </Router>
      </ChakraProvider>
    </UserContext.Provider>
  );
}

function GuardedApp({ userRole }) {
  return (
    <>
      {userRole === roles.guest && <Navigate to={routePaths.login} />}
      <Outlet />
    </>
  );
}
