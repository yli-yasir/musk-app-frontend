import { useEffect, useState } from "react";

export default function useSiteSearch(sites) {
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState(
    findSiteSuggestions(sites, searchValue)
  );

  useEffect(() => {
    setSuggestions(findSiteSuggestions(sites, searchValue));
  }, [searchValue, sites]);

  useEffect(() => console.log(suggestions), [suggestions]);
  return { searchValue, setSearchValue, suggestions };
}

function findSiteSuggestions(sites = [], search) {
  const targetSites = sites.filter((site) =>
    site.name.toLowerCase().includes(search.toLowerCase())
  );
  const suggestions = targetSites.map(({ id, name }) => ({ id, text: name }));

  return suggestions;
}
