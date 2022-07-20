import React,{useState} from 'react';
import { Button,View, Text, StyleSheet } from 'react-native';
// import { Location } from 'expo';
import * as Location from "expo-location";
//import "react-native-get-random-values";
// // Pull in the shims (BEFORE importing ethers)
//import "@ethersproject/shims";
import { contractABI, contractAddress } from "./utils/constants";
import { StatusBar} from 'expo-status-bar';


export default function App () {
  const [currentAccount, setCurrentAccount] = useState("");
  const [location, setUserLocation] = useState([]);
  const [newloc, setUserLoc] = useState([]);
  // console.log('car', location.coords['longitude'])
  console.log('car', location.coords);
  // setUserLoc(location.timestamp)
  // state = {
  //   location: {},
  //   errorMessage: '',
  // };

  // componentDidMount() {
  //   this._getLocation();
  // };
  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_requestAccounts", });

      setCurrentAccount(accounts[0]);
      // window.location.reload();
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const sendLocation = async () => {
    alert(JSON.stringify(this.state.location));
   }

  const getLocation = async () => {
    const {status} = await Location.requestForegroundPermissionsAsync();
     if (status !== "granted") { 
      Alert.alert(
        "Permission not granted",
        "Allow the app to use location service.",
        [{ text: "OK" }],
        { cancelable: false }
      );
    } else {
      const location = await Location.getCurrentPositionAsync();
     
      setUserLocation(location);
      alert(JSON.stringify(location));
    }
  // const location = await Location.getCurrentPositionAsync();
  //  this.setState({
  //   location
  //  });
   
  // alert(JSON.stringify(this.state.location));
  }
  //  render() {
    return (
      <>
      <View style={styles.container}>   
      <Button style={styles.btn} title="Wallet" onPress={connectWallet}/>
          <StatusBar style='auto'/>    
      </View>


     <View style={styles.container}>   
      <Button style={styles.btn} title="Show Location" onPress={getLocation}/>
          <StatusBar style='auto'/>
          <Text>{location.timestamp}</Text>
      
      </View>

      <View style={styles.container}>
      <Button style={styles.btn2} title="Send Location" onPress={sendLocation}/>
        <Text></Text>
      </View>

     </>
    );
   }
  // }

// export default function App() {
//   async  function  GetCurrentLocation () {
//     let { status } = await Location.requestForegroundPermissionsAsync();

//     if (status !== "granted") {
//       Alert.alert(
//         "Permission not granted",
//         "Allow the app to use location service.",
//         [{ text: "OK" }],
//         { cancelable: false }
//       );
//     }

//     let { coords } = await Location.getCurrentPositionAsync();

//     if (coords) {
//       const { latitude, longitude } = coords;
//       let response = await Location.reverseGeocodeAsync({
//         latitude,
//         longitude,
//       });

//       for (let item of response) {
//         let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;
//         alert(address);
//         // setUserLocation(address);
//       }
//     }
//   };
//    return (
//       <View style={styles.container}>   
//       <Button title="Show Location" onPress={GetCurrentLocation}/>
//           <StatusBar style='auto'/>
//       </View>
//     );

// }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#04d1ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: '#304b41',
    padding: 10
  },
  btn2: {
    backgroundColor: '#304b41',
    padding: 10,
    color: '#fff'
  }
});

