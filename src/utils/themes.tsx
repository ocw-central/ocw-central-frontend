import { createTheme } from "@mui/material/styles";
import { complementary, primary, tetradic } from "./colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: primary[100],
      light: primary[200],
      dark: primary[300],
    },
    secondary: {
      main: tetradic[400],
      light: primary[500],
      dark: complementary[200],
    },
  },
});