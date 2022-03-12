import Page from "../../components/Page";
import InspectionSitesGeoMap from "../../components/InspectionSitesGeoMap";
import Logo from "../../components/Logo";
import { Divider, Heading } from "@chakra-ui/react";

export default function DashboardPage() {
  return (
    <Page maxWidth="1000px" paddingTop={8} paddingX={2} width="100%">
      <Logo />
      <Heading mt={6} mb={2}>
        Dashboard
      </Heading>
      <Divider width="50%" my={4} />
      <InspectionSitesGeoMap width="100%" />
    </Page>
  );
}
