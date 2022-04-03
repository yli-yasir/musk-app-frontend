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

export default function SearchFilterMenu(props) {
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
        <MenuOptionGroup defaultValue="asc" title="Date" type="radio">
          <MenuItemOption value="asc">Ascending</MenuItemOption>
          <MenuItemOption value="desc">Descending</MenuItemOption>
        </MenuOptionGroup>
        <MenuDivider />
        <MenuOptionGroup defaultValue="asc" title="Interventions" type="radio">
          <MenuItemOption value="asc">Ascending</MenuItemOption>
          <MenuItemOption value="desc">Descending</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}
