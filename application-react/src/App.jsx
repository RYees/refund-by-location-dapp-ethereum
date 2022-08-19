import React from "react";
import { Route, Routes} from 'react-router-dom';
import Admin from "./mypages/Admin";
import Geolocation from "./mypages/Geolocation";
import Home from "./components/Home";
import Location from "./components/Location";

export default function App() {
    return (
      <>
        <Routes>
            <Route path='/admin' element={<Admin />} />
            <Route path='/loc' element={<Geolocation />} />
            <Route path='/' element={<Home />} />
            <Route path='/location' element={<Location />} />
        </Routes>
      </>
    )
}

