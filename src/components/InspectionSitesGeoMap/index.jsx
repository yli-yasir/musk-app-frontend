import { Box, Input, InputLeftElement, InputGroup } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import GeoMap from "../GeoMap";
import SearchMenu from "../SearchMenu";
import { useState } from "react";

const menuItems = [
  { text: "The amazing site", id: 0 },
  { text: "The nice site", id: 1 },
];

export default function InspectionSitesGeoMap(props) {
  const [searchValue, setSearchValue] = useState("");

  return (
    <Box width="100%" display="flex" flexDirection="column" alignItems="center">
      <SearchMenu
        searchValue={searchValue}
        onSearchValueChange={(e) => setSearchValue(e.target.value)}
        menuItems={menuItems.filter((item) =>
          item.text.toLowerCase().includes(searchValue.toLowerCase())
        )}
      />
      <GeoMap width="100%" />
    </Box>
  );
}
