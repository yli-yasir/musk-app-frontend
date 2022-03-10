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
import DashboardPage from "./Pages/Dashboard";
import { Box } from "@chakra-ui/react";

export default function App() {
  const [userContext, setUserContext] = useState({
    name: "anon",
    email: "anon@musk.com",
    role: roles.guest,
  });

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <UserContext.Provider value={[userContext, setUserContext]}>
        <ChakraProvider theme={theme}>
          <Router>
            <Routes>
              <Route path={routePaths.login} element={<LoginPage />} />
              <Route
                path="*"
                element={<div>Nothing to see here! 😨😨😨</div>}
              />
              <Route
                path="/"
                element={<GuardedApp userRole={userContext.role} />}
              >
                <Route index element={<DashboardPage />} />
              </Route>
            </Routes>
          </Router>
        </ChakraProvider>
      </UserContext.Provider>
    </Box>
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
