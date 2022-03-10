import { Box, Input, InputLeftElement, InputGroup } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import GeoMap from "../GeoMap";
import SearchMenu from "../SearchMenu";
import { useState } from "react";

const sites = [
  { text: "The amazing site", id: 0 },
  { text: "The nice site", id: 1 },
];

export default function InspectionSitesGeoMap(props) {
  const [suggestions, setSuggestions] = useState(sites);

  function findSuggestions(search) {
    return sites.filter((suggestion) =>
      suggestion.text.toLowerCase().includes(search.toLowerCase())
    );
  }
  return (
    <Box width="100%" display="flex" flexDirection="column" alignItems="center">
      <SearchMenu
        w="100%"
        maxW="400px"
        suggestions={suggestions}
        onChange={({ value }) => setSuggestions(findSuggestions(value))}
        mb={4}
      />
      <GeoMap width="100%" />
    </Box>
  );
}
