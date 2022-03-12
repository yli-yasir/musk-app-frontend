import { Box, useToast } from "@chakra-ui/react";
import GeoMap from "../GeoMap";
import SearchMenu from "../SearchMenu";
import { useEffect, useState } from "react";
import { useAsync } from "react-use";
import appFuncs from "../../appFuncs";

export default function InspectionSitesGeoMap(props) {
  const [suggestions, setSuggestions] = useState([]);

  const [focusCoords, setFocusCoords] = useState();

  const { value: sites } = useAsync(async () => {
    try {
      return await appFuncs.getInspectionSites();
    } catch (e) {
      console.log(e.message);
    }
  }, []);

  useEffect(() => {
    if (sites) {
      setSuggestions(sitesToSuggestions(sites));
      const { long, lat } = sites[0];
      setFocusCoords([long, lat]);
    }
  }, [sites]);

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
        onChange={({ value }) =>
          setSuggestions(findSiteSuggestions(sites, value))
        }
        onSuggestionSelected={(_, { suggestion }) =>
          setFocusCoords(getSiteCoords(sites, suggestion.id))
        }
        w="100%"
        maxW="400px"
        mb={4}
      />
      <GeoMap
        markers={sites || []}
        focusCoords={focusCoords}
        width="100%"
        onMarkerClick={(marker) => alert(marker.name)}
      />
    </Box>
  );
}

function findSiteSuggestions(sites, search) {
  const targetSites = sites.filter((site) =>
    site.name.toLowerCase().includes(search.toLowerCase())
  );
  return sitesToSuggestions(targetSites);
}

function getSiteCoords(sites, id) {
  const { long, lat } = sites.find((site) => site.id === id);
  return [long, lat];
}

function sitesToSuggestions(sites) {
  return sites.map(({ id, name }) => ({ id, text: name }));
}
