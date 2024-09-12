import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./layout/layout";
import ArtistInfoPage from "./pages/DetailPage/ArtistInfoPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {" "}
        {/* Layout 컴포넌트는 항상 렌더링 */}
        <Route index element={<HomePage />} />
        <Route path="callback" index element={<HomePage />} />
        <Route path="search" element={<SearchPage />} />{" "}
        {/* /search 경로에서 SearchPage 렌더링 */}
        <Route path="detail/:type/:id" element={<DetailPage />} />
        <Route path="detail/ArtistInfoPage" element={<ArtistInfoPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
