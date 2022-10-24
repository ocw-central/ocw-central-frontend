import { Footer } from "@/components/common/Footer";
import { PageNotFound } from "@/components/PageNotFound";
import "@/styles/App.css";
import { theme } from "@/utils/themes";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ThemeProvider } from "@emotion/react";
import { Grid } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AboutPage } from "./components/AboutPage";
import { Header } from "./components/common/Header";
import OGPTag from "./components/common/OGPTag";
import { ScrollToTop } from "./components/common/ScrollToTop";
import { HomePage } from "./components/HomePage";
import { SearchPage } from "./components/SearchPage";
import { SubjectPage } from "./components/SubjectPage";
import GlobalStyles from "./styles/GlobalStyles";

let uri: string;
if (import.meta.env.DEV) {
  uri = "http://localhost:8080/query";
} else if (APP_ENV == "DEV") {
  uri = "https://dev-api-ocwcentral.onrender.com/query";
} else {
  uri = "https://api-ocwcentral.onrender.com/query";
}
const client = new ApolloClient({
  uri: uri,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <OGPTag isRoot={true} />
        <ScrollToTop />
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Grid
            container
            direction="column"
            sx={{
              minHeight: "100vh",
              justifyContent: "space-between",
              bgcolor: "white",
            }}
          >
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/subjects/:id" element={<SubjectPage />} />
              <Route path="/search" element={<SearchPage />}></Route>
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer />
          </Grid>
        </ThemeProvider>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
