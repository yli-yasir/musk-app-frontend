import { Center } from "@chakra-ui/react";
import GeoMap from "./components/GeoMap";
import SiteInspectionForm from "./components/SiteInspectionForm";
import LoginPage from "./Pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routePaths from "./routePaths";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<div>root</div>} />
          <Route path={routePaths.login} element={<LoginPage />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
