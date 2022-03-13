import { useState } from "react";
import { AspectRatio, Box } from "@chakra-ui/react";
import useGeoMap from "./useGeoMap";
import useSites from "./useSites";
import SearchMenu from "../SearchMenu";
import useSiteSearch from "./useSiteSearch";

// const site = {id:0,name:'amazing', description: "hello there", inspectionCount, interventionCount, commendationCount, long: -100.324462, lat: -16.024695 ,}
export default function GeoMap(props) {
  const sites = useSites();

  const { suggestions, searchValue, setSearchValue } = useSiteSearch(sites);

  const [selectedSiteId, setSelectedSiteId] = useState();

  useGeoMap({
    sites,
    selectedSiteId,
    onSiteClick: (site) => setSelectedSiteId(site.id),
  });

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      {...props}
    >
      <SearchMenu
        suggestions={suggestions}
        searchValue={searchValue}
        onSearchValueChange={(value) => setSearchValue(value)}
        onSuggestionSelected={(_, { suggestion }) =>
          setSelectedSiteId(suggestion.id)
        }
        w="100%"
        maxW="400px"
        mb={4}
      />
      <AspectRatio {...props} ratio={16 / 9}>
        <Box borderRadius="lg" id="map-container" />
      </AspectRatio>
    </Box>
  );
}
