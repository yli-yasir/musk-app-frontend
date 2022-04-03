import InspectionSiteSearchMenu from "../../components/InspectionSiteSearchMenu";
import Logo from "../../components/Logo";
import Page from "../../components/Page";
import SiteInspectionTable from "../../components/SiteInspectionTable";
import useInspectionSearch from "./useInspectionSearch";
import SearchFilterMenu from "./SearchFilterMenu";
import { CircularProgress } from "@chakra-ui/react";

export default function InspectionsPage() {
  const { inspections } = useInspectionSearch();
  return (
    <Page maxWidth="1000px" paddingTop={8} paddingX={2} width="100%">
      <Logo mb={8} />
      <InspectionSiteSearchMenu />
      <SearchFilterMenu alignSelf="flex-end" mb={4} />
      {inspections ? (
        <SiteInspectionTable data={inspections} />
      ) : (
        <CircularProgress isIndeterminate color="blue.300" size={64} mt={4} />
      )}
    </Page>
  );
}
