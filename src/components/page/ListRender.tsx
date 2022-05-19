import { Box, Text, Pressable } from "native-base";
import React, { useCallback, useContext, useMemo, useRef } from "react";

import { LayoutProvider, RecyclerListView } from "recyclerlistview";
import { Dimensions } from "react-native";
import RenderPage from "./RenderPage";
import { useNavigation } from "@react-navigation/native";
import quran from "../../stores/Quran";
import { Observer } from "mobx-react";

function RenderList({ listRef, width, scrollFunc, height }) {
  const navigation = useNavigation();

  const layoutProvider = useMemo(() => {
    return new LayoutProvider(
      (i) => {
        return 1;
      },
      (type, dim) => {
        switch (type) {
          case 1:
            dim.width = width;
            dim.height = height;
            break;
        }
      }
    );
  }, []);
  function rowRenderer(type, data, i) {
    return (
      <RenderPage
        data={data}
        width={width}
        scrollFunc={scrollFunc}
        height={height}
        navigation={navigation}
        // extendedState={extendedState}
      />
    );
  }

  return (
    <RecyclerListView
      // initialScrollIndex={5}
      ref={listRef}
      dataProvider={quran.dataProvider}
      layoutProvider={layoutProvider}
      rowRenderer={rowRenderer}
      isHorizontal
      snapToInterval={width}
      decelerationRate={0}
      pagingEnabled
      disableIntervalMomentum
      scrollThrottle={16}
      showsHorizontalScrollIndicator={false}
      bounces={false}
      // onVisibleIndicesChanged={(i) => console.log(`i = ${i}`)}
      // disableRecycling
    />
  );
}

export default RenderList;
