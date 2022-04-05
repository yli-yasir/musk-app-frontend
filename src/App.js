import LoginPage from "./pages/Login";
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
import DashboardPage from "./pages/Dashboard";
import InspectionSitePage from "./pages/InspectionSite";
import { Box } from "@chakra-ui/react";
import InspectionsPage from "./pages/Inspections";
import NewInspectionPage from "./pages/NewInspection";
import RegisterPage from "./pages/Register";
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
              <Route
                path={routePaths.inspections}
                element={<InspectionsPage />}
              />
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
                <Route
                  path={routePaths.inspectionSite}
                  element={<InspectionSitePage />}
                />
                <Route
                  path={routePaths.newInspection}
                  element={<NewInspectionPage />}
                />
                <Route path={routePaths.register} element={<RegisterPage />} />
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
