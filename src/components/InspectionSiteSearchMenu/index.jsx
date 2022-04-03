import SearchMenu from "../SearchMenu";
import useSiteSearch from "../../hooks/useSiteSearch";
import { useEffect } from "react";

export default function InspectionSiteSearchMenu({
  onSiteSelected,
  onSitesFetched,
  ...props
}) {
  const {
    sites,
    suggestions,
    searchValue,
    setSearchValue,
    setSearchValueChangeMethod,
  } = useSiteSearch();

  useEffect(() => onSitesFetched && onSitesFetched(sites), [sites]);

  return (
    <SearchMenu
      suggestions={suggestions}
      searchValue={searchValue}
      onSearchValueChange={(value, method) => {
        setSearchValueChangeMethod(method);
        setSearchValue(value);
      }}
      onSuggestionSelected={(_, { suggestion }) => {
        const targetSite = sites.find((site) => site.id === suggestion.id);
        onSiteSelected && onSiteSelected(targetSite);
      }}
      w="100%"
      maxW="400px"
      mb={4}
      {...props}
    />
  );
}
