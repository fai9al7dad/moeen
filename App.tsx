import React, { useCallback, useEffect, useState } from "react";
import { Box, extendTheme, NativeBaseProvider } from "native-base";
import Routes from "./src/Routes";
import { fontCon } from "./src/utils/fonts/fontConfigNative";
import * as SplashScreen from "expo-splash-screen";
import { QueryClient, QueryClientProvider } from "react-query";
import axios from "axios";
import { I18nManager, View, Text, Dimensions } from "react-native";
import { Provider } from "mobx-react";
import quran from "./src/stores/Quran";
import UserProvider from "./src/components/providers/UserProvider";
import store from "./src/stores/Store";
import colorsModel from "./src/utils/sqlite/model/colorsModel";
import * as Font from "expo-font";

I18nManager.forceRTL(true);
I18nManager.allowRTL(true);
const allFonts = require("./src/utils/fonts/allFontsGlyps");
function cacheFonts(fonts) {
  return fonts.map((font) => Font.loadAsync(font));
}
const App = React.memo(() => {
  axios.defaults.headers.post["Content-Type"] = "application/json";
  axios.defaults.headers.post["Accept"] = "application/json";
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL =
    "http://74bb-2001-16a2-fad5-7d00-a0c0-7c17-8d7-bf02.eu.ngrok.io";
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
          // await colorsModel.alterTable();
          const fontAssets = cacheFonts([allFonts.allFonts]);
          await Promise.all(fontAssets);
          // await colorsModel.inserColor({
          //   wordID: 1,
          //   pageNumber: 1,
          //   chapterCode: "001",
          //   color: mistakesColor.mistake,
          // });
          // await colorsModel.inserColor({
          //   wordID: 2,
          //   pageNumber: 1,
          //   chapterCode: "001",
          //   color: mistakesColor.warning,
          // });

          let color = await colorsModel.getAllWords();

          quran.fillWordsColorsMistakes(color);
          await SplashScreen.hideAsync();

          setAppIsReady(true);
        } catch (e) {
          console.warn("e", e);
        } finally {
          console.log("finished");
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
