import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  extendTheme,
  NativeBaseProvider,
  useToast,
} from "native-base";
import Routes from "./src/Routes";
import { fontCon } from "./src/utils/fonts/fontConfigNative";
import * as SplashScreen from "expo-splash-screen";
import { QueryClient, QueryClientProvider } from "react-query";
import axios from "axios";
import { I18nManager, View, Text, Dimensions } from "react-native";
import { Provider } from "mobx-react";
import quran from "./src/stores/Quran";
import { openQuranDB } from "./src/utils/sqlite/quranDB";
import { loadAsync } from "expo-font";
import { UserContext } from "./src/components/providers";
import UserProvider from "./src/components/providers/UserProvider";
import store from "./src/stores/Store";
import { fonts1_100 } from "./src/utils/fonts/allFontsGlyps1-100";
import { fonts101_200 } from "./src/utils/fonts/allFontsGlyps101-200";
import { fonts201_301 } from "./src/utils/fonts/allFontsGlyps201-301";
import { fonts302_402 } from "./src/utils/fonts/allFontsGlyps302-402";
import { fonts403_503 } from "./src/utils/fonts/allFontsGlyps403-503";
import { fonts504_604 } from "./src/utils/fonts/allFontsGlyps504-604";
I18nManager.forceRTL(true);
I18nManager.allowRTL(true);
const App = React.memo(() => {
  axios.defaults.headers.post["Content-Type"] = "application/json";
  axios.defaults.headers.post["Accept"] = "application/json";
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL =
    "http://c423-2001-16a2-f8e7-da00-e157-e9a-b3e0-6df6.eu.ngrok.io";
  // "http://99a0-2001-16a2-f775-2100-3130-7291-fde4-f255.eu.ngrok.io";
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
          await openQuranDB();
          await SplashScreen.hideAsync();
          await loadAsync(fonts1_100);
          await loadAsync(fonts101_200);
          await loadAsync(fonts201_301);
          await loadAsync(fonts302_402);
          await loadAsync(fonts403_503);
          await loadAsync(fonts504_604);
        } catch (e) {
          console.warn("e", e);
        } finally {
          console.log("finished");

          // Tell the application to render
          setAppIsReady(true);
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
        <Text>loading Fonts... {appIsReady}</Text>
      </View>
    );
  }
  const queryClient = new QueryClient();
  return (
    <NativeBaseProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <Provider quran={quran} store={store}>
            <Box flex={1} position="relative">
              <Routes />
            </Box>
          </Provider>
        </UserProvider>
      </QueryClientProvider>
    </NativeBaseProvider>
  );
});

export default App;
