import { useEffect, useState } from "react";

export default function useSiteSearch(sites) {
  const [searchValue, setSearchValue] = useState("");
  const [searchValueChangeMethod, setSearchValueChangeMethod] = useState();
  const [suggestions, setSuggestions] = useState(
    findSiteSuggestions(sites, searchValue)
  );

  useEffect(() => {
    if (searchValueChangeMethod !== "up" && searchValueChangeMethod !== "down")
      setSuggestions(findSiteSuggestions(sites, searchValue));
  }, [searchValue, sites, searchValueChangeMethod]);

  useEffect(() => console.log(suggestions), [suggestions]);
  return {
    searchValue,
    setSearchValue,
    setSearchValueChangeMethod,
    suggestions,
  };
}

function findSiteSuggestions(sites = [], search) {
  const targetSites = sites.filter((site) =>
    site.name.toLowerCase().includes(search.toLowerCase())
  );
  const suggestions = targetSites.map(({ id, name }) => ({ id, text: name }));

  return suggestions;
}
