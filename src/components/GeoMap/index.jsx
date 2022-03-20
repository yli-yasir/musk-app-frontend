import { useState, useEffect } from "react";
import { AspectRatio, Box, Heading, Badge, Button } from "@chakra-ui/react";
import useGeoMap from "./useGeoMap";
import useSites from "./useSites";
import SearchMenu from "../SearchMenu";
import useSiteSearch from "./useSiteSearch";
import Paper from "../Paper";

// const site = {id:0,name:'amazing', icon: 'iconUrl', description: "hello there", inspectionCount, interventionCount, commendationCount, long: -100.324462, lat: -16.024695 ,}
export default function GeoMap(props) {
  const sites = useSites();

  const {
    suggestions,
    searchValue,
    setSearchValue,
    setSearchValueChangeMethod,
  } = useSiteSearch(sites);

  const [selectedSite, setSelectedSite] = useState();

  useEffect(() => {
    if (sites?.length > 0) {
      setSelectedSite(sites[0]);
    }
  }, [sites]);

  useGeoMap({
    sites,
    selectedSite,
    onSiteClick: (site) => setSelectedSite(site),
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
        onSearchValueChange={(value, method) => {
          setSearchValueChangeMethod(method);
          setSearchValue(value);
        }}
        onSuggestionSelected={(_, { suggestion }) => {
          const targetSite = sites.find((site) => site.id === suggestion.id);
          setSelectedSite(targetSite);
        }}
        w="100%"
        maxW="400px"
        mb={4}
      />
      <AspectRatio {...props} ratio={16 / 9}>
        <Box position="relative">
          {selectedSite && (
            <Paper
              position="absolute"
              zIndex={1}
              top={0}
              flexDirection="row"
              columnGap={4}
            >
              <Badge colorScheme="blue">{selectedSite.name}</Badge>
              <Badge colorScheme="purple">
                Inspections: {selectedSite.inspectionCount}
              </Badge>
              <Badge colorScheme="green">
                Commendations: {selectedSite.commendationCount}
              </Badge>
              <Badge colorScheme="yellow">
                Interventions: {selectedSite.interventionCount}
              </Badge>
              <Button size="sm" colorScheme="blue" flexGrow={1}>
                Details
              </Button>
            </Paper>
          )}
          <Box w="100%" h="100%" borderRadius="lg" id="map-container" />
        </Box>
      </AspectRatio>
    </Box>
  );
}
