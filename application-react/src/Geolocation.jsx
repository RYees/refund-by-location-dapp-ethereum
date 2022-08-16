import React,{useState, useEffect, useContext} from "react";
import { useGeolocated } from "react-geolocated";
import { TransactionContext } from './context/TransactionContext';

import './App.css'

const Geolocation = () => {
    const {connectWallet,transact,data, getResults, currentAccount, getTransactionDetails, contractCondition, sendPay, getBalance, transfer} = useContext(TransactionContext);
    //console.log('elev',getBalance);
    const [dateEpoch, setEpoch] = useState();
    const [distance, setDistance] = useState();
    const [hour, setHour] = useState();
  

    const { timestamp, coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });

    const epochTohumanReadble = () => {        
        let epoch = timestamp;
        let currentTimestamp = epoch;
        //console.log(currentTimestamp); // get current timestamp
        let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(currentTimestamp)
        let time =  date.split(' ')[1];
        const [hour, minute, second] = time.split(':');
        // console.log(date);
        // console.log(time);
        // console.log(hour);
        setHour(hour);
        setEpoch(date);
        
    }

    const callTransaction = () => {
        epochTohumanReadble();
        calculateDistance()
    }

    const calculateDistance = () => {
         let lon1 = transact[1]['transact'];
         let lat1 = transact[2]['transact'];
         let lat2 = coords.latitude;
         let lon2 = coords.longitude;
         sendLocation();
         console.log(lat1, lat2, lon1, lon2)
    }

    const sendLocation = (lat1, lat2, lon1, lon2) =>{
    //const sendLocation = () =>{  
        lon1 = lon1 * Math.PI / 180;
        lon2 = lon2 * Math.PI / 180;
        lat1 = lat1 * Math.PI / 180;
        lat2 = lat2 * Math.PI / 180;
        
        // Haversine formula
        let dlon = lon2 - lon1;
        let dlat = lat2 - lat1;
        let a = Math.pow(Math.sin(dlat / 2), 2)
        + Math.cos(lat1) * Math.cos(lat2)
        * Math.pow(Math.sin(dlon / 2),2);
        
        let c = 2 * Math.asin(Math.sqrt(a));
        let r = 3956; // in kilometer 
        let res = c * r;
        setDistance(res);
        //contractCondition('0x030a2336256e22ba0c99747aeed5bb1fb16de27f',18,4);
        //console.log('distance',distance, hour, currentAccount);    
        contractCondition(currentAccount, distance, hour);  
    }
    const hand = () => {
        contractCondition('0x030a2336256E22Ba0c99747aeeD5bb1fb16De27f','18','4');
    }
    useEffect(()=>{
        !isGeolocationAvailable ? (
            <div>Your browser does not support Geolocation</div>
        ) : !isGeolocationEnabled ? (
            <div>Geolocation is not enabled</div>
        ) : (
        <div>Getting the location data&hellip; </div>
    );

    //epochTohumanReadble();
    getTransactionDetails(currentAccount);
    });
    
    


    return (
    <> 
    {/* bg-[#30414b] */}
    <div><h1></h1></div>
    <div>
     <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#000] ml-4 p-3 rounded-full cursor-pointer"
            >
             
              <p className="btn text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
   
     </div>
    <div className="flex justify-center">
       <div className="mobile rounded-lg bg-black border p-2 shadow-2xl border-gray-900 -mt-32">
        <div className="mobile-content rounded">
           <div className="image">
            <img className="" src="./paul.jpg"></img>
           </div>
            <div className="content text-white">
            <div>
            <h1 className="text-4xl text-center mt-4 mb-5">Location</h1>
            <div className="p-4 text-center text-xl "><strong>Timestamp</strong> -- {timestamp}</div>
                <div className="text-center"><p>{dateEpoch}</p></div>
                {coords ? (
                    <div className="mb-4 p-4 text-center">
                        <p className="mb-4 text-xl "><strong>Latitude</strong> -- {coords.latitude}</p>
                        <p className="mb-4 text-xl "><strong>Longitude</strong> -- {coords.longitude}</p>
                    </div>    
                ): (
                    <div>Getting the location data&hellip; </div>
                )}
            <div className="text-center">
               <button onClick={hand} className="bg-black hover:bg-gray-300 hover:scale-x-110 transition-all p-2 py-3 rounded hover:brightness-150 text-2xl">Send Location</button>
            </div>
            {/* <div className="text-center">
               <button onClick={sendPay} className="bg-black hover:bg-gray-300 hover:scale-x-110 transition-all p-2 py-3 rounded hover:brightness-150 text-2xl">Send Pay</button>
            </div>
            <div className="text-center">
               <button onClick={transfer} className="bg-black hover:bg-gray-300 hover:scale-x-110 transition-all p-2 py-3 rounded hover:brightness-150 text-2xl">transfer</button>
            </div>
            <div className="text-center">
               <button onClick={getBalance} className="bg-black hover:bg-gray-300 hover:scale-x-110 transition-all p-2 py-3 rounded hover:brightness-150 text-2xl">balance</button>
            </div>
            <div className="text-center">
               <button onClick={getResults} className="bg-black hover:bg-gray-300 hover:scale-x-110 transition-all p-2 py-3 rounded hover:brightness-150 text-2xl">balance</button>
            </div> */}

            {/* (2) ['', '', accept: '', decline: '']
                    0: ""
                    1: ""
                    accept: ""
                    decline: ""
                    length: 2 */}

            {/* <div className="mt-4">
                <p>Out of Compliance, your contract is broken {data}</p>
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
   )
};

export default Geolocation;