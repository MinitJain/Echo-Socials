import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import Feed from "./Feed";
import Profile from "./Profile";
import Bookmarks from "./Bookmarks";

const Body = () => {
  return (
    <Routes>
      <Route element={<Home />}>
        <Route path="/home" element={<Feed />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
      </Route>
    </Routes>
  );
};

export default Body;
