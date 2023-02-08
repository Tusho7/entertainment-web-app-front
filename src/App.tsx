import axios from "axios";
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Bookmarked from "./Components/Bookmarked";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Movies from "./Components/Movies";
import TvSeries from "./Components/TvSeries";

function App() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [user, setUser] = useState({
    avatar: "",
    email: "",
    iat: 0,
    id: "",
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://long-pink-pelican-cap.cyclic.app/api/user/login",
        {
          email,
          password,
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const { token } = response.data;
      if (!token) {
        throw new Error("No token received from the server");
      }

      setToken(token);
      setIsLogin(true);

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const userResponse = await axios.get(
        "https://long-pink-pelican-cap.cyclic.app/api/user",
        config
      );
      const userData = userResponse.data;
      setUser(userData);
      console.log(userData);
      navigate("/home");
    } catch (error) {
      setError("Wrong email or password");
      console.log(error);
    }
  };

  return (
    <div className="App">
      <Routes>
        {isLogin ? (
          <>
            <Route
              path="home"
              element={
                <Home
                  setIsLogin={setIsLogin}
                  handleeSubmit={handleSubmit}
                  email={email}
                  setEmail={setEmail}
                  error={error}
                  password={password}
                  setPassword={setPassword}
                  user={user}
                />
              }
            ></Route>

            <Route
              path="movies"
              element={
                <Movies
                  setIsLogin={setIsLogin}
                  handleeSubmit={handleSubmit}
                  email={email}
                  setEmail={setEmail}
                  error={error}
                  password={password}
                  setPassword={setPassword}
                  user={user}
                />
              }
            ></Route>
            <Route
              path="tvseries"
              element={
                <TvSeries
                  setIsLogin={setIsLogin}
                  handleeSubmit={handleSubmit}
                  email={email}
                  setEmail={setEmail}
                  error={error}
                  password={password}
                  setPassword={setPassword}
                  user={user}
                />
              }
            ></Route>
            <Route
              path="bookmark"
              element={
                <Bookmarked
                  setIsLogin={setIsLogin}
                  handleeSubmit={handleSubmit}
                  email={email}
                  setEmail={setEmail}
                  error={error}
                  password={password}
                  setPassword={setPassword}
                  user={user}
                />
              }
            ></Route>
          </>
        ) : (
          <>
            <Route
              path="/"
              element={
                <Login
                  setIsLogin={setIsLogin}
                  handleeSubmit={handleSubmit}
                  email={email}
                  setEmail={setEmail}
                  error={error}
                  password={password}
                  setPassword={setPassword}
                  user={user}
                />
              }
            ></Route>
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
