import "@/styles/App.css";
import { theme } from "@/utils/themes";
import { ThemeProvider } from "@emotion/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AboutPage } from "./components/AboutPage";
import { Header } from "./components/common/Header";
import { HomePage } from "./components/HomePage";
import { SubjectPage } from "./components/SubjectPage";
import { SubjectsPage } from "./components/SubjectsPage";
import { UserGuidePage } from "./components/UserGuidePage";
import GlobalStyles from "./styles/GlobalStyles";

function App() {
  return (
    <BrowserRouter>
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
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
