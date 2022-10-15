import { Footer } from "@/components/common/Footer";
import { PageNotFound } from "@/components/PageNotFound";
import "@/styles/App.css";
import { theme } from "@/utils/themes";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ThemeProvider } from "@emotion/react";
import {
  auto as followSystemColorScheme,
  enable as enableDarkMode,
} from "darkreader";
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
    ? "http://localhost:8081/query"
    : "https://api-ocwcentral.onrender.com/query",
  cache: new InMemoryCache(),
});

const style_footer = {
  display: "flex",
  flexDirection: "column",

  minHeight: "100vh",
};
const style_footer_b = {
  flex: 1,
  flexBase: 0,
};

function App() {
  function activateDarkMode() {
    // set style to dark
  }

  // MediaQueryList
  const darkModePreference = window.matchMedia("(prefers-color-scheme: dark)");

  // recommended method for newer browsers: specify event-type as first argument
  darkModePreference.addEventListener(
    "change",
    (e) => e.matches && activateDarkMode()
  );

  enableDarkMode({
    brightness: 100,
    contrast: 90,
    sepia: 10,
  });

  followSystemColorScheme({ brightness: 123, contrast: 110, sepia: 0 });

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <ScrollToTop />
        <ThemeProvider theme={theme}>
          <div style={style_footer as React.CSSProperties}>
            <div style={style_footer_b}>
              <GlobalStyles />
              <Header />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/subjects/:id" element={<SubjectPage />} />
                <Route path="/search" element={<SearchPage />}></Route>
                <Route path="/about" element={<AboutPage />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </ThemeProvider>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
