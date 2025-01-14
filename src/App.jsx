import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 place-content-center bg-[#001232]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
