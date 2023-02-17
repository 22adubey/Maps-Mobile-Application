import React, { useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import axios from 'axios';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ViewBase } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useFonts } from 'expo-font';
import { collection, addDoc } from "firebase/firestore"; 
import { initializeApp } from 'firebase/app';
import {getDatabase, ref, onValue, set} from 'firebase/database';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase


// const firebaseConfig = {
//   apiKey: "AIzaSyCf4nHOEIJ9FYBqBwxqQZsqbhnysv_3iZg",
//   authDomain: "routora-c6502.firebaseapp.com",
//   projectId: "routora-c6502",
//   storageBucket: "routora-c6502.appspot.com",
//   messagingSenderId: "571185470577",
//   appId: "1:571185470577:web:386fa3c5b3755d74978fd0",
// };

// firebase.initializeApp(firebaseConfig);

let weeklyHours = '';
var placeId = 0;
let name = '';
let open = '';
const Routora = () => {
  // const [destination, setDestination] = useState(null);
  const [marker, setMarker] = useState({ lat: 10, lng: 10 });
  const [infoBoxVisible, setInfoBoxVisible] = useState(false);
  
  const firebaseConfig = {
    apiKey: "AIzaSyCf4nHOEIJ9FYBqBwxqQZsqbhnysv_3iZg",
    authDomain: "routora-c6502.firebaseapp.com",
    databaseURL: "https://routora-c6502-default-rtdb.firebaseio.com",
    projectId: "routora-c6502",
    storageBucket: "routora-c6502.appspot.com",
    messagingSenderId: "571185470577",
    appId: "1:571185470577:web:386fa3c5b3755d74978fd0",
    measurementId: "G-VWWNC0K51R"
  };

initializeApp(firebaseConfig);

  function store(place, open) {
      const db = getDatabase();
      const reference = ref(db,'place/' + place);
      set(reference, {
        isOpen: open,
      });
  }
  const onPressAdd = async (details) => {
    placeId = details.place_id;
    // console.log(details)
    // const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=AIzaSyACDQskcM6lCQMzkeF8-FK_JRlER_azCeg`);
    setMarker(details.geometry.location);
    
  };

// const Input = () => {
//   return (
    
//   )
// }

  const markerPressed = async () => {
    console.log("pressed")
    // const placeId = details.place_id;
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=AIzaSyACDQskcM6lCQMzkeF8-FK_JRlER_azCeg`);
    const data = response.data;
    // console.log(data)
    name = '';
    if (data.result && data.result.name) {
        name = data.result.name;
        console.log(name)
  }
  let hours = '';
  
  if (data.result && data.result.opening_hours) {
    hours = data.result.opening_hours;
    openNow = hours.open_now;
    if (openNow){
      open = "Open Now"
    }
    else{
      open = "Closed"
    }
    weeklyHours = hours.weekday_text;
    store(name, openNow);
    setInfoBoxVisible(!infoBoxVisible);
    console.log(open);
    console.log(weeklyHours);
   
    
}

 
}
  
return(
    <View style={{flex: 1}}>
    {/* <ScrollView  style={{flexGrow: 1}} 
    nestedScrollEnabled={true}  keyboardShouldPersistTaps={'handled'}> */}
      
      
    {/* </ScrollView> */}
     <MapView
      style={{ flex: 1, height: "100%", marginTop: 0 }}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      initialRegion={{
        latitude: 32.9857,
        longitude: -96.7502,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}>
      <Marker coordinate={{ latitude: marker.lat, longitude: marker.lng }} 
      onPress = {() => {markerPressed()}}
      />
    
      <GooglePlacesAutocomplete 
    
     placeholder="Search" 
    fetchDetails={true}

  query={{
    key: "AIzaSyACDQskcM6lCQMzkeF8-FK_JRlER_azCeg",
    language: 'en',
  }}
  // GooglePlacesDetailsQuery={{
  //   fields: 'geometry',
  // }}
  onPress={(data, details) => onPressAdd(details)}
    onFail={error => console.log(error)}
    onNotFound={() => console.log('no results')}
//   styles={{
//     textInputContainer: {
//       backgroundColor: 'rgba(0,0,0,0)',
//       borderTopWidth: 0,
//       borderBottomWidth: 0,
//     },
//     textInput: {
//       marginLeft: 0,
//       marginRight: 0,
//       height: 38,
//       color: '#5d5d5d',
//       fontSize: 16,
//     },
//     predefinedPlacesDescription: {
//       color: '#1faadb',
//     },
//   }}
/>
{/* style={{backgroundColor: 'white', padding: 20, position: 'absolute', bottom: 20, right: 20}} */}
        </MapView> 
        {infoBoxVisible && (
      <View style={{backgroundColor: '#00b28b', padding: 10, position: 'absolute', alignSelf:"center", bottom: 20}}>
        <Text style={{color: 'white', marginBottom:5, fontWeight:'bold',}}>{name} - {open}</Text>
        <Text style={{color: 'white'}}>Weekly Hours: {weeklyHours.join(" ")}</Text>
        <TouchableOpacity style = {{backgroundColor:'00b28b',}}onPress={() => setInfoBoxVisible(false)}>
          <Text style={{alignContent:'center', fontWeight:'bold',fontSize:'15', color:'white', marginTop: 5}}>Close Box</Text>
        </TouchableOpacity>
      </View>
    )}
        </View>
  
  );
};
const styles = StyleSheet.create({
    map: {
      flex:1
    },
    });

export default Routora;

