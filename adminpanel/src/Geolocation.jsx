import React,{useState, useEffect} from "react";
import { useGeolocated } from "react-geolocated";
import './App.css'

const Geolocation = () => {
  
    const { timestamp, coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });

    useEffect(()=>{
        !isGeolocationAvailable ? (
            <div>Your browser does not support Geolocation</div>
        ) : !isGeolocationEnabled ? (
            <div>Geolocation is not enabled</div>
        ) : (
        <div>Getting the location data&hellip; </div>
    );
    });

    const epochTohumanReadble = () => {
        let epoch = timestamp;
        let currentTimestamp = epoch;
        //console.log(currentTimestamp); // get current timestamp
        let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(currentTimestamp)
        console.log(date);
        
    }

    return (
    <> 
    {/* bg-[#30414b] */}
    <div className="flex justify-center">
       <div className="mobile rounded-lg bg-black border p-2 shadow-2xl border-gray-900 mt-5">
        <div className="mobile-content rounded">
           <div className="image">
            <img className="" src="./paul.jpg"></img>
           </div>
            <div className="content text-white">
            <div>
            <h1 className="text-4xl text-center mt-4 mb-5">Location</h1>
            <div className="p-4 text-center text-xl "><strong>Timestamp</strong> -- {timestamp}</div>
                {coords ? (
                    <div className="mb-4 p-4 text-center">
                        <p className="mb-4 text-xl "><strong>Latitude</strong> -- {coords.latitude}</p>
                        <p className="mb-4 text-xl "><strong>Longitude</strong> -- {coords.longitude}</p>
                    </div>    
                ): (
                    <div>Getting the location data&hellip; </div>
                )}
            <div className="text-center">
               <button onClick={epochTohumanReadble} className="bg-black hover:bg-gray-300 hover:scale-x-110 transition-all p-2 py-3 rounded hover:brightness-150 text-2xl">Send Location</button>
            </div>
            <div className="mt-4">
                <p>Out of Compliance, your contract is broken</p>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
   )
};

export default Geolocation;