import { InputGroup, InputLeftElement, Input, Box } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import Autosuggest from "react-autosuggest";
import { useState } from "react";
import { Search2Icon } from "@chakra-ui/icons";
// suggestion = {id:0, text: 'hello world'}
export default function SearchMenu({ suggestions, onChange, ...props }) {
  const [searchValue, setSearchValue] = useState("");
  return (
    <Box position="relative" {...props}>
      <Autosuggest
        suggestions={suggestions}
        getSuggestionValue={(suggestion) => suggestion.text}
        onSuggestionsFetchRequested={onChange}
        onSuggestionsClearRequested={() => {}}
        renderSuggestion={renderSuggestion}
        renderInputComponent={renderInput}
        inputProps={{
          value: searchValue,
          onChange: (_, { newValue }) => setSearchValue(newValue),
        }}
        renderSuggestionsContainer={renderSuggestionsContainer}
      />
    </Box>
  );
}

function renderInput(props) {
  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        children={<SearchIcon color="gray.300" />}
      />
      <Input placeholder="Search" {...props} />
    </InputGroup>
  );
}

function renderSuggestionsContainer({ containerProps, children }) {
  return (
    <Box
      position="absolute"
      zIndex={1}
      w="100%"
      bgColor="white"
      borderRadius="lg"
      shadow="2xl"
      mt={4}
      cursor="pointer"
      {...containerProps}
    >
      {children}
    </Box>
  );
}
function renderSuggestion(menuItem) {
  return (
    <Box
      borderRadius="lg"
      fontWeight="bold"
      padding={2}
      display="flex"
      alignItems="center"
      columnGap={3}
    >
      <Search2Icon />
      <i>{menuItem.text}</i>
    </Box>
  );
}
