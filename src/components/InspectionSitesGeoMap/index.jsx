import { Box, Input, InputLeftElement, InputGroup } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import GeoMap from "../GeoMap";

export default function InspectionSitesGeoMap(props) {
  return (
    <Box width="100%" display="flex" flexDirection="column" alignItems="center">
      <InputGroup maxWidth="500px">
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input placeholder="Search inspection sites" mb={4} />
      </InputGroup>
      <GeoMap width="100%" />
    </Box>
  );
}
