import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        backgroundColor: "gray.200",
      },
      ".react-autosuggest__suggestions-list": {
        listStyleType: "none",
      },
    },
  },
});

export default theme;
