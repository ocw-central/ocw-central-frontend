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

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/subject/:id" element={<SubjectPage />} />
            <Route path="/subjects" element={<SubjectsPage />}></Route>
            <Route path="/about" element={<AboutPage />} />
            <Route path="/guideline" element={<UserGuidePage />} />
          </Routes>
          <Footer />
        </ThemeProvider>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
