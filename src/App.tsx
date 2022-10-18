import { Footer } from "@/components/common/Footer";
import { PageNotFound } from "@/components/PageNotFound";
import "@/styles/App.css";
import { theme } from "@/utils/themes";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ThemeProvider } from "@emotion/react";
import { createTheme, Grid } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AboutPage } from "./components/AboutPage";
import { Header } from "./components/common/Header";
import { ScrollToTop } from "./components/common/ScrollToTop";
import { HomePage } from "./components/HomePage";
import { SearchPage } from "./components/SearchPage";
import { SubjectPage } from "./components/SubjectPage";
import GlobalStyles from "./styles/GlobalStyles";

const client = new ApolloClient({
  uri: import.meta.env.DEV
    ? "http://localhost:8080/query"
    : "https://api-ocwcentral.onrender.com/query",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
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
