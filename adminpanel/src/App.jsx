import React from "react";
import { Route, Routes} from 'react-router-dom';
import Admin from "./Admin";
import Geolocation from "./Geolocation";

export default function App() {
    return (
      <>
        <Routes>
            <Route path='/' element={<Admin />} />
            <Route path='/location' element={<Geolocation />} />
        </Routes>
      </>
    )
}

