import { createTheme } from "@mui/material/styles";
import { complementary, primary, useful } from "./colors";

export const theme = createTheme({
  typography: {
    fontFamily: [
      "-apple - system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Helvetica",
      "Arial",
    ].join(","),
    fontSize: 16,
  },
  palette: {
    mode: "light",
    primary: {
      main: primary[100],
      light: primary[200],
      dark: primary[300],
    },
    secondary: {
      main: useful[100],
      light: primary[500],
      dark: complementary[200],
    },
  },
});
