import { Routes, Route } from 'react-router-dom';
import "../src/App.css";
import Layout from './Layout/Layout';
import HomePage from './pages/HomePage/HomePage';  // 홈 페이지
import SearchPage from './pages/SearchPage/SearchPage.jsx';
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import DetailPage from "./pages/DetailPage/DetailPage";
import ArtistInfoPage from "./pages/DetailPage/ArtistInfoPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>  {/* Layout 컴포넌트는 항상 렌더링 */}
        <Route index element={<HomePage />} />
        <Route path="callback" index element={<HomePage />} />
        <Route path="search" element={<SearchPage />} />  {/* /search 경로에서 SearchPage 렌더링 */}
        <Route path="detail/:type/:id" element={<DetailPage />} />
        <Route path="detail/ArtistInfoPage" element={<ArtistInfoPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
