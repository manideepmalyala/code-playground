import logo from "./logo.svg";
import Home from "./components/home/Home";
import HomeLayout from "./pages/HomeLayout";
import Playground from "./components/playground/Playground";
import "@radix-ui/themes/styles.css";
import "./App.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import LoginScreen from "./components/home/Login";
import Authentication from "./pages/Authentication";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Authentication />}>
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<Home />} />
            <Route path="session/:sessionId" element={<Playground />} />
          </Route>
          <Route path="/login" element={<LoginScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
