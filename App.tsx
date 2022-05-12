import React, { useCallback, useEffect, useState } from "react";
import { Box, extendTheme, NativeBaseProvider, Text } from "native-base";
import Routes from "./src/Routes";
import { fonts } from "./src/utils/allFontsGlyps";
import { fontCon } from "./src/utils/fontConfigNative";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";

import axios from "axios";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.withCredentials = true;

import { I18nManager } from "react-native";
I18nManager.forceRTL(true);
I18nManager.allowRTL(true);
export default function App() {
  // let [fontsLoaded] = useFonts(fonts);

  const [appIsReady, setAppIsReady] = useState(false);

  const theme = extendTheme({
    fontConfig: fontCon,
  });
  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync(fonts);
      } catch (e) {
        console.warn("e", e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  // causes disk io error
  // async function openDatabase() {
  //   if (
  //     !(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite"))
  //       .exists
  //   ) {
  //     await FileSystem.makeDirectoryAsync(
  //       FileSystem.documentDirectory + "SQLite"
  //     );
  //   }
  //   await FileSystem.downloadAsync(
  //     Asset.fromModule(require("./src/assets/db/quran.db")).uri,
  //     FileSystem.documentDirectory + "SQLite/quran.db"
  //   );
  //   return SQLite.openDatabase("quran.db");
  // }

  // openDatabase();

  return (
    <NativeBaseProvider theme={theme}>
      <Box onLayout={onLayoutRootView} flex={1}>
        <Routes />
      </Box>
    </NativeBaseProvider>
  );
}
