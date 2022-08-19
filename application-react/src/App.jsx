import React from "react";
import { Route, Routes} from 'react-router-dom';
import Admin from "./Admin";
import Geolocation from "./Geolocation";
import Home from "./Home";
import Location from "./Location";

export default function App() {
    return (
      <>
        <Routes>
            <Route path='/' element={<Admin />} />
            <Route path='/location' element={<Geolocation />} />
            <Route path='/home' element={<Home />} />
            <Route path='/loc' element={<Location />} />
        </Routes>
      </>
    )
}

