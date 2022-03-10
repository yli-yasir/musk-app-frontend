import { InputGroup, InputLeftElement, Input, Box } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import Autosuggest from "react-autosuggest";
import { useState } from "react";
import Paper from "../Paper";

// suggestion = {id:0, text: 'hello world'}
export default function SearchMenu({ suggestions, onChange }) {
  const [searchValue, setSearchValue] = useState("");
  return (
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
      bgColor={"gray.300"}
      shadow="2xl"
      mt={4}
      {...containerProps}
      listStyleType="none"
    >
      {children}
    </Box>
  );
}
function renderSuggestion(menuItem) {
  return <span>{menuItem.text}</span>;
}
