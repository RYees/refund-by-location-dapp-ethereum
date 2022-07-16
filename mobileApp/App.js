import React from 'react';
import { Button,View, Text, StyleSheet } from 'react-native';
// import { Location } from 'expo';
import * as Location from "expo-location";


import { StatusBar} from 'expo-status-bar';

export default class App extends React.Component {
  state = {
    location: {},
    errorMessage: '',
  };

  // componentDidMount() {
  //   this._getLocation();
  // };

  _getLocation = async () => {
    const {status} = await Location.requestForegroundPermissionsAsync();
     if (status !== "granted") {
      Alert.alert(
        "Permission not granted",
        "Allow the app to use location service.",
        [{ text: "OK" }],
        { cancelable: false }
      );
    }
  const location = await Location.getCurrentPositionAsync();
   this.setState({
    location
   })
   
  // alert(JSON.stringify(this.state.location));
  }
   render() {
    return (
      // <View style={styles.container}>
      //   <Text>{JSON.stringify(this.state.location)}</Text>
      // </View>

      <View style={styles.container}>   
      <Button title="Show Location" onPress={this._getLocation}/>
          <StatusBar style='auto'/>
          <Text>{JSON.stringify(this.state.location.coords)}</Text>
      </View>
    );
   }
  }

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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

