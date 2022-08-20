import React,{useState, useEffect, useContext} from "react";
import { useGeolocated } from "react-geolocated";
import { TransactionContext } from '../context/TransactionContext';
import picc from '../images/pngfind.png';
import picd from '../images/pngfind1.png';
import '../css/test.css'

const Location = () => {
    const {connectWallet, transact, output, currentAccount, getTransactionDetails, contractCondition, getResults} = useContext(TransactionContext);
    const [dateEpoch, setEpoch] = useState();
    const [distance, setDistance] = useState();
    const [hour, setHour] = useState();
    const [lat1, setLat1] = useState();
    const [lat2, setLat2] = useState();
    const [lon1,setLong1] = useState();
    const [lon2,setLong2] = useState();

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
        <div>Getting the location data...&hellip; </div>    
        );
    });

    const epochTohumanReadble = () => {        
        let epoch = timestamp;
        let currentTimestamp = epoch;
        let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(currentTimestamp)
        let time =  date.split(' ')[1];
        const [hour, minute, second] = time.split(':');
        let hourtime = hour.toString()
        console.log('houring', hourtime);
        setHour(hourtime);
        setEpoch(date);        
    }
    getTransactionDetails(currentAccount);
    

    const callTransaction = () => {
        epochTohumanReadble();
        calculateDistance();
        console.log('bbbside', transact[0]['transact'],transact[2]['transact'],transact[1]['transact']);
    }

    const calculateDistance = () => {
         let lon2 = transact[1]['transact'];
         let lat2 = transact[2]['transact'];
         let lat1 = coords.latitude;
         let lon1 = coords.longitude;
         setLat1(lat1); setLat2(lat2); setLong1(lon1); setLong2(lon2);
         sendLocation(lat1, lat2, lon1, lon2);
         console.log('bbb', transact);
        //  console.log('motivation',lat1, lat2, lon1, lon2)
    }

    const sendLocation = (lat1, lat2, lon1, lon2) =>{
        console.log('motivation',lat1, lat2, lon1, lon2)
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
        let val = Math.round(res)
        let dist = val.toString()
        console.log('hi',res, dist);
        console.log('hello',res, hour, currentAccount);
        setDistance(dist)  
        //console.log('vation', currentAccount, distance, '4')
        contractCondition(currentAccount, distance, '4');  
    }
   
    const checkResult = () => {
        getResults(currentAccount);
    }

return (
    <>
    <div className='flex bg-cover'>
        <img className="pic" src={picc}></img>
        <img className="pic" src={picd}></img>
    </div>

    <div className="overlay"></div>

    <div className='btnloc flex justify-end'>
      <button onClick={connectWallet} 
        className='btn-col py-3 px-3 m-2 text-white absolute top-0'>
        Connect Wallet
      </button>
    </div>

    <div className="mob-box rounded float-right">
      <h1 className="text-4xl px-4 py-3 italic font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-red-600">Your Location</h1>      
      <div className="flex">
            <div className="w-96">
            <div className="p-4 text-center text-2xl mt-10 text-white"><strong className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-800 to-blue-600">Timestamp</strong><br></br> {timestamp}</div>
                    <div className="text-center text-2xl"><p>{dateEpoch}</p></div>
                    {coords ? (
                        <div className="mb-4 p-4 text-center">
                            <p className="mb-4 text-2xl text-white"><strong className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-800 to-blue-600">Latitude</strong> <br></br> {coords.latitude}</p>
                            <p className="mb-4 text-2xl text-white"><strong className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-800 to-blue-600">Longitude</strong><br></br> {coords.longitude}</p>
                        </div>    
                    ): (
                        <div>Getting the location data&hellip; </div>
            )}
            </div>
            <div className="line"></div>
            
        <div className="flex flex-col mx-24 my-20">
            <div className="text-center mb-5">
                <button onClick={callTransaction} className="send text-center text-white transition-all px-4 py-4 rounded hover:brightness-150 text-xl">Send Location</button>
            </div>  
            <div className="text-center mb-20">
                   <button onClick={checkResult} className="send text-center text-white transition-all px-2 py-2 rounded hover:brightness-150 text-xl">Check</button>
            </div>
            <div className="mt-4">
                <p className="text-xl"><strong className="text-3xl text-blue-900">{output}</strong></p>
            </div>  
        </div>    
        </div>
    
    </div>

    </>
  )
}

export default Location