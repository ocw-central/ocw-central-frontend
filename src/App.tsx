import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Header } from "./components/common/Header";
import { HomePage } from "./components/HomePage";
import { SubjectPage } from "./components/SubjectPage";
import { SubjectsPage } from "./components/SubjectsPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/subject/:id" element={<SubjectPage />} />
        <Route path="/subjects" element={<SubjectsPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
