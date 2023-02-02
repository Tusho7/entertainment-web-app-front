import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Bookmarked from "./Components/Bookmarked";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Movies from "./Components/Movies";
import TvSeries from "./Components/TvSeries";

function App() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  return (
    <div className="App">
      <Routes>
        {isLogin ? (
          <>
            <Route path="home" element={<Home />}></Route>

            <Route path="movies" element={<Movies />}></Route>
            <Route path="tvseries" element={<TvSeries />}></Route>
            <Route path="bookmark" element={<Bookmarked />}></Route>
          </>
        ) : (
          <>
            <Route path="/" element={<Login setIsLogin={setIsLogin} />}></Route>
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
