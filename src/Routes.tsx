import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./assets/types";
import SelectSurah from "./screens/SelectSurah";
import Quran from "./screens/Quran";
import Register from "./screens/auth/Register";
import Login from "./screens/auth/Login";

import * as SecureStore from "expo-secure-store";
import { useContext } from "react";
import { UserContext } from "./components/providers";
import { useEffect } from "react";
import { useState } from "react";
import { Center, Spinner } from "native-base";
import UserProvider from "./components/providers/UserProvider";
import SelectDuo from "./screens/SelectDuo";

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeStack = () => {
  // const fadeNavigation = ({ current }) => ({
  //   cardStyle: {
  //     opacity: current.progress,
  //   },
  // });
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: "#fff8ed" },
      }}
    >
      <Stack.Screen
        name="Quran"
        component={Quran}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SelectSurah"
        component={SelectSurah}
        options={{
          headerTitle: "السور",
          // presentation: "modal",

          // headerTransparent: true,
          // headerBlurEffect: "regular",
          // headerBackTitle: "المصحف",
          headerStyle: {
            backgroundColor: "#fff8ed",
          },
          headerBackTitle: "المصحف",
          // headerLargeTitle: true,
        }}
      />
      <Stack.Screen
        options={{
          contentStyle: { backgroundColor: "#fff8ed" },
          headerStyle: { backgroundColor: "#fff8ed" },
          headerBackTitle: "المصحف",
          headerTitleStyle: { fontFamily: "montserrat" },
          headerTitle: "اختر الثنائي",
          headerTintColor: "#047857",
          headerBackTitleStyle: { fontFamily: "montserrat" },
          // headerShown: false
        }}
        name="SelectDuo"
        component={SelectDuo}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          contentStyle: { backgroundColor: "#fff" },
          headerStyle: { backgroundColor: "#fff" },
          headerTitleStyle: { fontFamily: "montserrat" },
          headerTitle: "تسجيل دخول",
          headerTintColor: "#000",
        }}
      />
      <Stack.Screen
        options={{
          contentStyle: { backgroundColor: "#fff" },
          headerStyle: { backgroundColor: "#fff" },
          headerBackTitle: "دخول",
          headerTitleStyle: { fontFamily: "montserrat" },
          headerTitle: "حساب جديد",
          headerTintColor: "#000",
          headerBackTitleStyle: { fontFamily: "montserrat" },
          // headerShown: false
        }}
        name="Register"
        component={Register}
      />
    </Stack.Navigator>
  );
};

const Routes = () => {
  // const { state } = useContext(UserContext);

  // if (state.isLoading) {
  //   return (
  //     <Center height="100%" width="100%">
  //       <Spinner />
  //     </Center>
  //   );
  // }
  return (
    <NavigationContainer>
      <HomeStack />
      {/* {state?.isSignedIn ? <HomeStack /> : <AuthStack />} */}
    </NavigationContainer>
  );
};

export default Routes;

// const AuthStack = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="Login"
//         component={Login}
//         options={{
//           contentStyle: { backgroundColor: "#fff" },
//           headerStyle: { backgroundColor: "#fff" },
//           headerTitleStyle: { fontFamily: "montserrat" },
//           headerTitle: "تسجيل دخول",
//           headerTintColor: "#000",
//         }}
//       />
//       <Stack.Screen
//         options={{
//           contentStyle: { backgroundColor: "#fff" },
//           headerStyle: { backgroundColor: "#fff" },
//           headerBackTitle: "دخول",
//           headerTitleStyle: { fontFamily: "montserrat" },
//           headerTitle: "حساب جديد",
//           headerTintColor: "#000",
//           headerBackTitleStyle: { fontFamily: "montserrat" },
//           // headerShown: false
//         }}
//         name="Register"
//         component={Register}
//       />
//     </Stack.Navigator>
//   );
// };
