
import React,{ useState } from "react";
import Topbar from "./components/nav/Topbar";
import Intro from "./components/landing/Intro"
import SApp from "./components/userslogin/SApp"
import Contact from "./components/contact/Contact"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//import "./app.scss"

import {
  BrowserRouter,
  Routes,
  Route

} from "react-router-dom";

import Menu from "./components/menu/Menu";

function App() {
  const [menuOpen,setMenuOpen] = useState(false)
  return (
        <div className="app">
<BrowserRouter>
  <nav>
  <Topbar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
  <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
  </nav>
    
    <Routes>
    <Route path="/contact" element={<Contact/>}/>
    <Route path="/intro" element={<Intro/>}/>
    <Route path="/" element={<Intro/>}/>
    <Route path="*" element={<Intro/>}/>
    <Route path="/dashboard" element={<SApp/>}/>    
    </Routes>
    </BrowserRouter>
    <ToastContainer />
    </div>
  );
}

export default App;