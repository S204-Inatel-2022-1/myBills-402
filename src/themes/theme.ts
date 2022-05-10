import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    red: {
      500: "#DC1637",
    },
    green: {
      500: "#03B252",
    },
    gray: {
      300: "#969CB2",
      700: "#414141",
      900: "#1B1B1F",
    },
    white: {
      200: "#F4F5F6",
      300: "#F0F2F5",
    },
  },
  sizes: {
    sidebar: "4rem",
    page: "calc(100vw - 4rem)",
  },
  components: {
    Table: {
      variants: {
        customTable: {
          tr: {
            th: {
              fontWeight: "normal",
              textTransform: "capitalize",
              color: "gray.300",
            },
          },
        },
      },
    },
  },
  fonts: {
    heading: "Poppins, sans-serif",
    body: "Poppins, sans-serif",
  },
});

export { theme };
