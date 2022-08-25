import { Header } from "./components/common/Header";
import "./App.css";
import { SubjectPage } from "./components/SubjectPage";
import { SubjectsPage } from "./components/SubjectsPage";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { HomePage } from "./components/HomePage";

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
