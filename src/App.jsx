import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout.jsx";
import HomePage from "./pages/HomePage/HomePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import AlbumPage from "./pages/AlbumPage/AlbumPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import DetailPage from "./pages/DetailPage/DetailPage";
import ArtistInfoPage from "./pages/DetailPage/ArtistInfoPage";
import { Provider } from "react-redux";
import store from "./redux/store.jsx";
import ProtectPage from "./layout/Component/ProtectPage.jsx";
import SearchResultPage from "./pages/SearchResultPage/SearchResultPage.jsx";

function App() {


  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectPage>
                <Layout />
              </ProtectPage>
            }
          >
            <Route index element={<HomePage />} />
            <Route path="search" index element={<SearchPage />} />
            <Route path="detail/:type/:id" element={<DetailPage />} />
            <Route path="detail/ArtistInfoPage" element={<ArtistInfoPage />} />
            <Route path="detail/AlbumPage" element={<AlbumPage />} />
            <Route path="search/:keyword" element={<SearchResultPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Provider>
    </>
  );
}

export default App;
