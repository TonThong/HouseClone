import { Route, Routes } from "react-router-dom";
import HomePage from "~/pages/Home/HomePage";
import SearchPage from "~/pages/Search/SearchPage";
import BlogPage from "~/pages/Blog/BlogPage";
import ContactPage from "~/pages/Contact/ContactPage";
import AdvertisePage from "~/pages/Advertise/AdvertisePage";
import LogPage from "~/pages/Log/LogPage";
import SignPage from "~/pages/Sign/SignPage";
import NewsPage from "~/pages/News/NewsPage";
import ProjectPage from "~/pages/Project/ProjectPage";

import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search/:id" element={<SearchPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/advertise" element={<AdvertisePage />} />
        <Route path="/log" element={<LogPage />} />
        <Route path="/sign" element={<SignPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/:id" element={<ProjectPage />} />
      </Routes>
    </>
  );
}

export default App;
