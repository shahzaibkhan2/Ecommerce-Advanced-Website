import React from "react";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// PAGES COMPONENTS
import { Home, Contact, Login, Register, Reset } from "./pages";
import Admin from "./pages/admin/Admin";
// BASIC COMPONENTS
import { Header, Footer } from "./components";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
