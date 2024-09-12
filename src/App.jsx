import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout.jsx";
import HomePage from "./pages/HomePage/HomePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import DetailPage from "./pages/DetailPage/DetailPage";
import ArtistInfoPage from "./pages/DetailPage/ArtistInfoPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="callback" index element={<HomePage />} />
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
