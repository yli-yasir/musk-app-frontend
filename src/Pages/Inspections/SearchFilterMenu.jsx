import {
  MenuButton,
  Button,
  Menu,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  MenuDivider,
} from "@chakra-ui/react";
import { UpDownIcon } from "@chakra-ui/icons";
import { useSearchParams } from "react-router-dom";

export default function SearchFilterMenu(props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (name, value) => {
    searchParams.set(name, value);
    setSearchParams(searchParams);
  };

  return (
    <Menu closeOnSelect={true}>
      <MenuButton
        as={Button}
        colorScheme="blue"
        leftIcon={<UpDownIcon />}
        {...props}
      >
        ORDER
      </MenuButton>
      <MenuList minWidth="240px">
        <MenuOptionGroup
          defaultValue="dsc"
          title="Date"
          type="radio"
          onChange={(value) => handleChange("dateOrder", value)}
        >
          <MenuItemOption value="asc">Ascending</MenuItemOption>
          <MenuItemOption value="desc">Descending</MenuItemOption>
        </MenuOptionGroup>
        <MenuDivider />
        <MenuOptionGroup
          defaultValue="dsc"
          title="Interventions"
          onChange={(value) => handleChange("interventionOrder", value)}
          type="radio"
        >
          <MenuItemOption value="asc">Ascending</MenuItemOption>
          <MenuItemOption value="desc">Descending</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}
