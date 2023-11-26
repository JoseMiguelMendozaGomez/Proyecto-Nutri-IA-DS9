import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ListChat from "./pages/ListChat";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import NotFound from "./pages/NotFound";
import Reg from "./pages/Reg";
import RegChat from "./pages/RegChat";
import NoAccess from "./pages/NoAccess";
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";

function App() {
  const [login, setLogin]=useState(false);

  const handleLogin=(()=>{
    setLogin(true)
  })

  const handleLogout=(()=>{
    setLogin(false)
  })

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}>
            {" "}
          </Route>
          <Route path="/listchat" element={<ListChat />}>
            {" "}
          </Route>
          <Route path="/login" element={<Login onLogin={handleLogin} />}>
            {" "}
          </Route>
          <Route path="/logout" element={<Logout  onLogout={handleLogout} />}>
            {" "}
          </Route>
          <Route path="/noaccess" element={<NoAccess />}>
            {" "}
          </Route>
          <Route path="/register" element={<Reg />}>
            {" "}
          </Route>
          <Route path="/regchat" element={<RegChat />}>
            {" "}
          </Route>
          <Route path="/*" element={<NotFound />}>
            {" "}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
