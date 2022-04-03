import InspectionSiteSearchMenu from "../../components/InspectionSiteSearchMenu";
import Logo from "../../components/Logo";
import Page from "../../components/Page";
import SiteInspectionTable from "../../components/SiteInspectionTable";
import useInspectionSearch from "./useInspectionSearch";
import SearchFilterMenu from "./SearchFilterMenu";
import { CircularProgress } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";

export default function InspectionsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { inspections, isLoading } = useInspectionSearch(searchParams);

  return (
    <Page maxWidth="1000px" paddingTop={8} paddingX={2} width="100%">
      <Logo mb={8} />
      <InspectionSiteSearchMenu
        onSiteSelected={({ name }) => {
          searchParams.set("site", name);
          setSearchParams(searchParams);
        }}
      />
      <SearchFilterMenu alignSelf="flex-end" mb={4} />
      {!isLoading ? (
        <SiteInspectionTable data={inspections} />
      ) : (
        <CircularProgress isIndeterminate color="blue.300" size={64} mt={4} />
      )}
    </Page>
  );
}
