import { useState, useEffect } from "react";
import { AspectRatio, Box, Heading, Badge, Button } from "@chakra-ui/react";
import useGeoMap from "./useGeoMap";
import SearchMenu from "../SearchMenu";
import useSiteSearch from "../../hooks/useSiteSearch";
import Paper from "../Paper";
import { ViewIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { getInspectionSitePath } from "../../routePaths";
import InspectionSiteSearchMenu from "../InspectionSiteSearchMenu";

// const site = {id:0,name:'amazing', icon: 'iconUrl', description: "hello there", inspectionCount, interventionCount, commendationCount, long: -100.324462, lat: -16.024695 ,}
export default function GeoMap(props) {
  const navigate = useNavigate();

  const [sites, setSites] = useState();
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
      <InspectionSiteSearchMenu
        onSitesFetched={(sites) => setSites(sites)}
        onSiteSelected={(site) => setSelectedSite(site)}
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
              maxW="700px"
              p={4}
              m={4}
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
              <Button
                size="sm"
                colorScheme="blue"
                flexGrow={1}
                variant="outline"
                leftIcon={<ViewIcon />}
                onClick={() => navigate(getInspectionSitePath(selectedSite.id))}
              >
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
