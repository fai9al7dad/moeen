import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  extendTheme,
  NativeBaseProvider,
  useToast,
} from "native-base";
import Routes from "./src/Routes";
import { fonts } from "./src/utils/allFontsGlyps";
import { fontCon } from "./src/utils/fontConfigNative";
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
I18nManager.forceRTL(true);
I18nManager.allowRTL(true);
const App = React.memo(() => {
  axios.defaults.headers.post["Content-Type"] = "application/json";
  axios.defaults.headers.post["Accept"] = "application/json";
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = "http://192.168.1.51:8000";
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
          await loadAsync(fonts);
        } catch (e) {
          console.warn("e", e);
        } finally {
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
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

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
            <Box onLayout={onLayoutRootView} flex={1} position="relative">
              <Routes />
            </Box>
          </Provider>
        </UserProvider>
      </QueryClientProvider>
    </NativeBaseProvider>
  );
});

export default App;
