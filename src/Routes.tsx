import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import { RootStackParamList } from "./assets/types";
import SelectSurah from "./screens/SelectSurah";

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeStack = () => {
  const fadeNavigation = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: "#fff8ed" },
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SelectSurah"
        component={SelectSurah}
        options={{
          headerTitle: "السور",
          animation: "fade",
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
    </Stack.Navigator>
  );
};

const Routes = () => {
  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  );
};

export default Routes;
