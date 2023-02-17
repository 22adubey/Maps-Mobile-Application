import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Routora from './navigation/Routora';
import AppLoading from 'expo-app-loading';
import { useFonts, VarelaRound_400Regular } from '@expo-google-fonts/varela-round';
import * as SplashScreen from 'expo-splash-screen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();


export default function App() {
  const [fontsLoaded] = useFonts({
    VarelaRound_400Regular,
  });
  // useEffect(() => {
  //   async function prepare() {
  //     await SplashScreen.preventAutoHideAsync();
  //   }
  //   prepare();
  // }, []);

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  // if (!fontsLoaded) {
  //   return null;
  // }
  if (!fontsLoaded){
    return <AppLoading />
  }
  return (
   <NavigationContainer>
      <Tab.Navigator
        // tabBarOptions = {{
        //   showLabel: false,

        // }}
       screenOptions={{
         headerStyle:
           {backgroundColor: '#00b28b'},
         headerTitleStyle:
           { fontSize: 23, color: 'white', fontFamily: 'VarelaRound_400Regular', fontWeight: 100},
         tabBarStyle:
           {backgroundColor: '#00b28b'},
         tabBarLabelStyle: {
           color: 'white'
         }
         }}
      >
       {<Tab.Screen name = "Routora" component = {Routora} options={{tabBarLabel: 'Routora',
      tabBarIcon: ({ }) => (
        <Ionicons name="navigate-outline" color="white" size="20"/>
      ), }}

       /> }
     </Tab.Navigator>
 </NavigationContainer>
 );
}


const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#00b28b',
   alignItems: 'center',
   justifyContent: 'center',
 },
});
