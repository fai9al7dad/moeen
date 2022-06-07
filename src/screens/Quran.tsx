import { Box, Text } from "native-base";
import React, { useCallback, useEffect, useRef } from "react";
import { Dimensions, Platform } from "react-native";
import { QuranDataContext } from "../contexts/QuranDataContext";
import RenderList from "../components/page/ListRender";
import { inject, observer } from "mobx-react";
import { useState } from "react";
import { DataProvider } from "recyclerlistview";
import { getPageMistakesAndWarnings } from "../utils/sqlite/getPageMistakesAndWarnings";
import { mistakesColor } from "../assets/conts/mistakes";

const Quran = ({ quran, route, store, navigation }) => {
  const listRef = useRef<any>(null);
  const { width, height } = Dimensions.get("window");
  // useEffect(() => {
  //   const initQuran = async () => {
  //   };
  //   initQuran();
  // }, []);
  useEffect(() => {
    const bootstrapCall = async () => {
      await quran.initDataProvider({ isClone: store.isWerd ? true : false });
      setTimeout(() => {
        // to fix later, beacuse list words dont update unitl out of window
        if (listRef?.current) {
          listRef?.current?.scrollToIndex(8);
          listRef.current.scrollToIndex(0);
        }
      }, 50);
    };
    bootstrapCall();
  }, [store.isWerd]);

  const scrollFunc = useCallback(
    (index) => {
      if (Platform.OS === "ios") {
        listRef?.current?.scrollToIndex(index);
      } else {
        // android starts from reverse
        let page = (index - 604) * -1;

        listRef?.current?.scrollToIndex(page - 1);
      }
    },
    [listRef]
  );

  const value = {
    scrollFunc,
    navigation,
  };
  useEffect(() => {
    let pageNumber = 0;
    if (route?.params !== undefined) {
      pageNumber = route?.params?.pageNumber;
      setTimeout(() => {
        if (Platform.OS === "ios") {
          listRef.current.scrollToIndex(pageNumber);
        } else {
          // android starts from reverse
          let page = (pageNumber - 604) * -1;

          listRef?.current?.scrollToIndex(page - 1);
        }
      }, 50);
    }
  }, [route]);

  return (
    <QuranDataContext.Provider value={value}>
      <Box flex={1}>
        {quran.quranData.length > 5 ? (
          <RenderList listRef={listRef} width={width} height={height} />
        ) : null}
      </Box>
    </QuranDataContext.Provider>
  );
};

export default inject("quran", "store")(observer(Quran));
