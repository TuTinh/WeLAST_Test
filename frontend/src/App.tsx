import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import ListRepos from "./components/ListRepos";
import DetailRepo from "./components/DetailRepo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/repos" element={<ListRepos />} />
      <Route path="/repos/:id" element={<DetailRepo />} />
    </Routes>
  );
}

export default App;
