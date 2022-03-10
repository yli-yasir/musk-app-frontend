import React, { useState } from "react";
import SearchMenu from "./index";

export default {
  title: "components/SearchMenu",
  component: SearchMenu,
};

const allItems = [
  { text: "The amazing site", id: 0 },
  { text: "The nice site", id: 1 },
];
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Primary = (args) => {
  const [menuItems, setMenuItems] = useState([
    { text: "The amazing site", id: 0 },
    { text: "The nice site", id: 1 },
  ]);

  function findSuggestions(search) {
    return allItems.filter((suggestion) =>
      suggestion.text.toLowerCase().includes(search.toLowerCase())
    );
  }

  return (
    <div>
      hi
      <SearchMenu
        suggestions={menuItems}
        onChange={({ value }) => setMenuItems(findSuggestions(value))}
      />
    </div>
  );
};
