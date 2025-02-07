import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";

export default function App() {
  return (
    <Router>
      <div className="bg-[#1A1A1A] min-h-screen text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />

        </Routes>
      </div>
    </Router>
  );
}