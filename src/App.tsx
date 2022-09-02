import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AboutPage } from "./components/AboutPage";
import { Header } from "./components/common/Header";
import { HomePage } from "./components/HomePage";
import { SubjectPage } from "./components/SubjectPage";
import { SubjectsPage } from "./components/SubjectsPage";
import { UserGuidePage } from "./components/UserGuidePage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/subject/:id" element={<SubjectPage />} />
        <Route path="/subjects" element={<SubjectsPage />}></Route>
        <Route path="/about" element={<AboutPage />} />
        <Route path="/guideline" element={<UserGuidePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
