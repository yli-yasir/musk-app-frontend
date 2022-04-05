import {
  MenuButton,
  Button,
  Menu,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  MenuDivider,
  MenuItem,
} from "@chakra-ui/react";
import { UpDownIcon } from "@chakra-ui/icons";
import { useSearchParams } from "react-router-dom";

export default function SearchFilterMenu(props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (sortOption) => {
    for (const [key] of searchParams.entries()) {
      key.match(/.+order/i) && searchParams.delete(key);
    }
    const [key, value] = sortOption.split("-");
    searchParams.set(key, value);
    console.log(searchParams);
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
          defaultValue="desc"
          title="Sort by"
          type="radio"
          onChange={handleChange}
        >
          <MenuItemOption value="dateOrder-asc">Date Ascending</MenuItemOption>
          <MenuItemOption value="dateOrder-desc">
            Date Descending
          </MenuItemOption>
          <MenuDivider />
          <MenuItemOption value="interventionOrder-asc">
            Interventions Ascending
          </MenuItemOption>
          <MenuItemOption value="interventionOrder-desc">
            Interventions Descending
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}
