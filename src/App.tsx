import { Footer } from "@/components/common/Footer";
import "@/styles/App.css";
import { theme } from "@/utils/themes";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ThemeProvider } from "@emotion/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AboutPage } from "./components/AboutPage";
import { Header } from "./components/common/Header";
import { ScrollToTop } from "./components/common/ScrollToTop";
import { HomePage } from "./components/HomePage";
import { SubjectPage } from "./components/SubjectPage";
import { SubjectsPage } from "./components/SubjectsPage";
import { UserGuidePage } from "./components/UserGuidePage";
import GlobalStyles from "./styles/GlobalStyles";

const client = new ApolloClient({
  uri: import.meta.env.DEV
    ? "http://localhost:8081/query"
    : "https://ocw-central-server.onrender.com/query",
  cache: new InMemoryCache(),
});

const style_footer = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
};
const style_footer_b = {
  flex: 1,
};

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <ScrollToTop />
        <ThemeProvider theme={theme}>
          <div style={style_footer}>
            <div style={style_footer_b}>
              <GlobalStyles />
              <Header />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/subject/:id" element={<SubjectPage />} />
                <Route path="/subjects" element={<SubjectsPage />}></Route>
                <Route path="/about" element={<AboutPage />} />
                <Route path="/guideline" element={<UserGuidePage />} />
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
