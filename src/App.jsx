import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./layout/layout";
import ArtistInfoPage from "./pages/DetailPage/ArtistInfoPage";
import DetailPage from "./pages/DetailPage/DetailPage";
import HomePage from "./pages/HomePage/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import SearchPage from "./pages/SearchPage/SearchPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="search" index element={<SearchPage />} />
          <Route path="detail/:type/:id" element={<DetailPage />} />
          <Route path="detail/ArtistInfoPage" element={<ArtistInfoPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
