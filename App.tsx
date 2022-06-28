import React, { useCallback, useEffect, useState } from "react";
import { Box, extendTheme, NativeBaseProvider, StatusBar } from "native-base";
import Routes from "./src/Routes";
import { fontCon } from "./src/utils/fonts/fontConfigNative";
import * as SplashScreen from "expo-splash-screen";
import { QueryClient, QueryClientProvider } from "react-query";
import axios from "axios";
import { I18nManager, View, Text, Dimensions, Platform } from "react-native";
import { Provider } from "mobx-react";
import quran from "./src/stores/Quran";
import UserProvider from "./src/components/providers/UserProvider";
import store from "./src/stores/Store";
import colorsModel from "./src/utils/sqlite/model/colorsModel";
import * as Font from "expo-font";
import { openQuranDB } from "./src/utils/sqlite/quranDB";
import tempColorsModel from "./src/utils/sqlite/model/tempColorsModel";

I18nManager.forceRTL(true);
I18nManager.allowRTL(true);
const allFontsGlyps1 = require("./src/utils/fonts/allFontsGlyps1-100");
const allFontsGlyps2 = require("./src/utils/fonts/allFontsGlyps101-200");
const allFontsGlyps3 = require("./src/utils/fonts/allFontsGlyps201-301");
const allFontsGlyps4 = require("./src/utils/fonts/allFontsGlyps302-402");
const allFontsGlyps5 = require("./src/utils/fonts/allFontsGlyps403-503");
const allFontsGlyps6 = require("./src/utils/fonts/allFontsGlyps504-604");
function cacheFonts(fonts) {
  return fonts.map((font) => Font.loadAsync(font));
}
const App = React.memo(() => {
  axios.defaults.headers.post["Content-Type"] = "application/json";
  axios.defaults.headers.post["Accept"] = "application/json";
  axios.defaults.withCredentials = true;
  // axios.defaults.baseURL = "http://moeen-api.herokuapp.com";
  axios.defaults.baseURL = "http://192.168.1.51:3000";
  // let [fontsLoaded] = useFonts(fonts);
  const { width, height } = Dimensions.get("window");
  const [appIsReady, setAppIsReady] = useState(false);
  const theme = extendTheme({
    fontConfig: fontCon,
  });

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      async function prepare() {
        try {
          // Keep the splash screen visible while we fetch resources
          await SplashScreen.preventAutoHideAsync();
          await colorsModel.createTable();
          await tempColorsModel.createTable();
          // await colorsModel.deleteAllColors();
          // await colorsModel.alterTable();
          // const fontAssets = cacheFonts([allFonts.allFonts]);
          await Font.loadAsync(allFontsGlyps1.fonts1_100);
          await Font.loadAsync(allFontsGlyps2.fonts101_200);
          await Font.loadAsync(allFontsGlyps3.fonts201_301);
          await Font.loadAsync(allFontsGlyps4.fonts302_402);
          await Font.loadAsync(allFontsGlyps5.fonts403_503);
          await Font.loadAsync(allFontsGlyps6.fonts504_604);
          // await colorsModel.deleteAllColors();
          let color = await colorsModel.getAllWords();

          quran.fillWordsColorsMistakes(color);
          await SplashScreen.hideAsync();
          setAppIsReady(true);
          await openQuranDB();
        } catch (e) {
          console.warn("e", e);
        } finally {
          // Tell the application to render
        }
      }
      prepare();
    }
    return () => {
      mounted = false;
    };
  }, []);
  // const onLayoutRootView = useCallback (async () => {
  //   if (appIsReady) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [appIsReady]);

  if (!appIsReady) {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Text>loading Fonts... </Text>
      </View>
    );
  }
  const queryClient = new QueryClient();
  return (
    <NativeBaseProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <Provider quran={quran} store={store}>
            {Platform.OS === "ios" ? (
              <StatusBar barStyle={"dark-content"} />
            ) : null}

            <MainComp />
          </Provider>
        </UserProvider>
      </QueryClientProvider>
    </NativeBaseProvider>
  );
});

const MainComp = React.memo(() => {
  return (
    <Box flex={1} position="relative">
      <Routes />
    </Box>
  );
});
export default App;
