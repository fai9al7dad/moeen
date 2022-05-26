import { Box } from "native-base";
import React, { useCallback, useEffect, useRef } from "react";
import { Dimensions } from "react-native";
import { QuranDataContext } from "../contexts/QuranDataContext";
import RenderList from "../components/page/ListRender";
import { inject, observer } from "mobx-react";
import { useState } from "react";

const Quran = ({ quran, navigation }) => {
  const listRef = useRef<any>(null);
  const { width, height } = Dimensions.get("window");
  console.log("rendered quran");
  // to force rerender after finishing werd
  useEffect(() => {
    quran.initDataProvider();
  }, []);

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

  return (
    <Box flex={1}>
      <QuranDataContext.Provider value={value}>
        {quran.quranData.length > 1 ? (
          <RenderList
            listRef={listRef}
            width={width}
            scrollFunc={scrollFunc}
            height={height}
          />
        ) : null}
      </QuranDataContext.Provider>
    </Box>
  );
};

export default inject("quran")(observer(Quran));
