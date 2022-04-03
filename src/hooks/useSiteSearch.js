import { useEffect, useState } from "react";
import useSites from "./useSites";

export default function useSiteSearch() {
  const sites = useSites();
  const [searchValue, setSearchValue] = useState("");
  const [searchValueChangeMethod, setSearchValueChangeMethod] = useState();
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (
      searchValueChangeMethod !== "up" &&
      searchValueChangeMethod !== "down"
    ) {
      setSuggestions(findSiteSuggestions(sites, searchValue));
    }
  }, [searchValue, sites, searchValueChangeMethod]);

  return {
    sites,
    searchValue,
    setSearchValue,
    setSearchValueChangeMethod,
    suggestions,
  };
}

function findSiteSuggestions(sites, search) {
  const targetSites = sites?.filter((site) =>
    site.name.toLowerCase().includes(search.toLowerCase())
  );
  const suggestions = targetSites?.map(({ id, name }) => ({ id, text: name }));

  // Watch out for returning a new array - will trigger rerender
  return suggestions || [];
}
