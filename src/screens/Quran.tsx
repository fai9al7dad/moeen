import { Box, Text } from "native-base";
import React, { useCallback, useEffect, useRef } from "react";
import { Dimensions } from "react-native";
import { QuranDataContext } from "../contexts/QuranDataContext";
import RenderList from "../components/page/ListRender";
import { inject, observer } from "mobx-react";
import { useState } from "react";

const Quran = ({ quran, route, store, navigation }) => {
  const listRef = useRef<any>(null);
  const { width, height } = Dimensions.get("window");

  useEffect(() => {
    const bootstrapCall = async () => {
      if (store.isWerd) {
        quran.initDataProviderClone();
        setTimeout(() => {
          // to fix later, beacuse list words dont update unitl out of window
          listRef.current.scrollToIndex(0);
          listRef.current.scrollToIndex(4);
        }, 500);
      } else {
        quran.initDataProvider();
      }
    };
    bootstrapCall();
  }, [store.isWerd]);

  const scrollFunc = useCallback(
    (index) => {
      listRef.current.scrollToIndex(index);
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
        listRef.current.scrollToIndex(pageNumber);
      }, 50);
    }
  }, [route]);
  return (
    <Box flex={1}>
      <QuranDataContext.Provider value={value}>
        {quran.quranData.length > 1 ? (
          <RenderList listRef={listRef} width={width} height={height} />
        ) : null}
      </QuranDataContext.Provider>
    </Box>
  );
};

export default inject("quran", "store")(observer(Quran));
