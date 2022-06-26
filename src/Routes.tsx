import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./assets/types";
import SelectSurah from "./screens/SelectSurah";
import Quran from "./screens/Quran";
import Register from "./screens/auth/Register";
import Login from "./screens/auth/Login";
import { Ionicons } from "@expo/vector-icons";
import { SelectDuo } from "./screens/duo/SelectDuo";
import SearchDuo from "./screens/duo/SearchDuo";
import ViewWirds from "./screens/duo/ViewWirds";
import FinishWerd from "./screens/werd/FinishWerd";
import ViewWerdHighlights from "./screens/werd/ViewWerdHighlights";
import WerdMeta from "./screens/werd/WerdMeta";
import StartOrFinishWerdMeta from "./screens/werd/StartOrFinishWerdMeta";
import { Button } from "react-native";
import { Pressable } from "native-base";
import { Settings } from "./screens/settings";
import AboutApp from "./screens/settings/AboutApp";
import Intro from "./screens/onBoardings/Intro";
// <RootStackParamList>
import * as SecureStore from "expo-secure-store";
import store from "./stores/Store";
import { inject, observer } from "mobx-react";
import ForgotPassword from "./screens/auth/ForgotPassword";

const Stack = createNativeStackNavigator();

const HomeStack = observer(() => {
  // const fadeNavigation = ({ current }) => ({
  //   cardStyle: {
  //     opacity: current.progress,
  //   },
  // });
  React.useEffect(() => {
    const boot = async () => {
      let val = await SecureStore.getItemAsync("finishedOnBoarding");
      if (val !== null) {
        store.updateOnBoarding({ status: "seen" });
      } else {
        store.updateOnBoarding({ status: "notSeen" });
      }
    };
    boot();
  }, []);
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: "#fff8ed" },
      }}
    >
      {store.showOnBoarding ? (
        <Stack.Screen
          options={{ headerShown: false }}
          name="intro"
          component={Intro}
        />
      ) : (
        <Stack.Screen
          name="Quran"
          component={Quran}
          options={{ headerShown: false }}
        />
      )}

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
        options={({ navigation }) => ({
          contentStyle: { backgroundColor: "#fff8ed" },
          headerStyle: { backgroundColor: "#fff8ed" },
          headerBackTitle: "المصحف",
          headerTitleStyle: { fontFamily: "montserrat" },
          headerTitle: "اختر الثنائي",
          headerTintColor: "#047857",
          headerBackTitleStyle: { fontFamily: "montserrat" },
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate("Settings")}>
              <Ionicons name="ios-cog" size={24} color="#047857" />
            </Pressable>
          ),
          // headerShown: false,
        })}
        name="SelectDuo"
        component={SelectDuo}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          contentStyle: { backgroundColor: "#fff8ed" },
          headerStyle: { backgroundColor: "#fff8ed" },
          headerBackTitle: "الثنائيات",
          headerTitleStyle: { fontFamily: "montserrat" },
          headerTitle: "الإعدادات",
          headerTintColor: "#047857",
          headerBackTitleStyle: { fontFamily: "montserrat" },
          // headerShown: false,
        })}
        name="Settings"
        component={Settings}
      />
      <Stack.Screen
        options={{
          contentStyle: { backgroundColor: "#fff8ed" },
          headerStyle: { backgroundColor: "#fff8ed" },
          headerBackTitle: "الإعدادات",
          headerTitleStyle: { fontFamily: "montserrat" },
          headerTitle: "عن التطبيق",
          headerTintColor: "#047857",
          headerBackTitleStyle: { fontFamily: "montserrat" },
          // headerShown: false
        }}
        name="AboutApp"
        component={AboutApp}
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
        name="FinishWerd"
        component={FinishWerd}
      />
      <Stack.Screen
        options={{
          contentStyle: { backgroundColor: "#fff8ed" },
          headerStyle: { backgroundColor: "#fff8ed" },
          headerBackTitle: "الثنائيات",
          headerTitleStyle: { fontFamily: "montserrat" },
          headerTitle: "الأوراد",
          headerTintColor: "#047857",
          headerBackTitleStyle: { fontFamily: "montserrat" },
          // headerShown: false
        }}
        name="ViewWirds"
        component={ViewWirds}
      />
      <Stack.Screen
        options={{
          contentStyle: { backgroundColor: "#fff8ed" },
          headerStyle: { backgroundColor: "#fff8ed" },
          headerBackTitle: "الأوراد",
          headerTitleStyle: { fontFamily: "montserrat" },
          headerTitle: "تفاصيل الورد",
          headerTintColor: "#047857",
          headerBackTitleStyle: { fontFamily: "montserrat" },
          // headerShown: false
        }}
        name="ViewWerdsHighlights"
        component={ViewWerdHighlights}
      />
      <Stack.Screen
        options={{
          contentStyle: { backgroundColor: "#fff8ed" },
          headerStyle: { backgroundColor: "#fff8ed" },
          headerBackTitle: "الأوراد",
          headerTitleStyle: { fontFamily: "montserrat" },
          headerTitle: "تفاصيل الورد",
          headerTintColor: "#047857",
          headerBackTitleStyle: { fontFamily: "montserrat" },
          // headerShown: false
        }}
        name="StartOrFinishWerdMeta"
        component={StartOrFinishWerdMeta}
      />
      <Stack.Screen
        options={{
          contentStyle: { backgroundColor: "#fff8ed" },
          headerStyle: { backgroundColor: "#fff8ed" },
          headerBackTitle: "الورد",
          headerTitleStyle: { fontFamily: "montserrat" },
          headerTitle: "تعديل الورد",
          headerTintColor: "#047857",
          presentation: "modal",
          headerBackTitleStyle: { fontFamily: "montserrat" },
          // headerShown: false
        }}
        name="WerdMeta"
        component={WerdMeta}
      />
      <Stack.Screen
        options={{
          contentStyle: { backgroundColor: "#fff8ed" },
          headerStyle: { backgroundColor: "#fff8ed" },
          headerBackTitle: "الثنائيات",
          headerTitleStyle: { fontFamily: "montserrat" },
          headerTitle: "ابحث",
          headerTintColor: "#047857",
          headerBackTitleStyle: { fontFamily: "montserrat" },
          // headerShown: false
        }}
        name="SearchDuo"
        component={SearchDuo}
      />
      {/* auth */}
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          contentStyle: { backgroundColor: "#fff8ed" },
          headerStyle: { backgroundColor: "#fff8ed" },
          headerTitleStyle: { fontFamily: "montserrat" },
          headerBackTitle: "الثنائيات",
          headerBackTitleStyle: { fontFamily: "montserrat" },

          headerTitle: "تسجيل دخول",
          headerTintColor: "#000",
        }}
      />
      <Stack.Screen
        options={{
          contentStyle: { backgroundColor: "#fff8ed" },
          headerStyle: { backgroundColor: "#fff8ed" },
          headerBackTitle: "دخول",
          headerTitleStyle: { fontFamily: "montserrat" },
          headerTitle: "استعادة كلمة المرور",
          headerTintColor: "#000",
          headerBackTitleStyle: { fontFamily: "montserrat" },
          // headerShown: false
        }}
        name="ForgotPassword"
        component={ForgotPassword}
      />
      <Stack.Screen
        options={{
          contentStyle: { backgroundColor: "#fff8ed" },
          headerStyle: { backgroundColor: "#fff8ed" },
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
});

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
