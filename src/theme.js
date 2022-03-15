import { extendTheme } from "@chakra-ui/react";
const theme = extendTheme({
  styles: {
    global: {
      ".react-autosuggest__suggestions-list": {
        listStyleType: "none",
        padding: "8px",
      },
      ".react-autosuggest__suggestion": {
        margin: "16px 0",
      },
      ".react-autosuggest__suggestion--highlighted": {
        backgroundColor: "blue.100",
        borderRadius: "8px",
      },
    },
  },
});

export default theme;
