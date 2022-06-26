import React, { useMemo } from "react";

import { LayoutProvider, RecyclerListView } from "recyclerlistview";
import { Dimensions } from "react-native";
import RenderPage from "./RenderPage";
import { inject, observer } from "mobx-react";
import quran from "../../stores/Quran";
import { quranArray } from "../../types/quran.types";
import { Box, Text } from "native-base";

const VIEW_TYPES = {
  FULL: 0,
  SEPERATOR: 1,
};
function RenderList({ store, listRef, width, height }: any) {
  const layoutProvider = useMemo(() => {
    return new LayoutProvider(
      (i) => {
        return 1;
        // if (i % 2 === 0) {
        //   return VIEW_TYPES.SEPERATOR;
        // } else {
        //   return VIEW_TYPES.FULL;
        // }
      },
      (type, dim) => {
        switch (type) {
          case 1:
            dim.width = width;
            dim.height = height;
            break;
          // case VIEW_TYPES.SEPERATOR:
          //   dim.width = width * 0.2;
          //   dim.height = height;
          //   break;
        }
      }
    );
  }, []);

  return (
    <>
      <RecyclerListView
        // initialScrollIndex={5}
        ref={listRef}
        dataProvider={store.isWerd ? quran.dataProvider : quran.dataProvider}
        layoutProvider={layoutProvider}
        rowRenderer={RowRenderer}
        isHorizontal
        snapToInterval={width}
        decelerationRate={0}
        disableIntervalMomentum
        pagingEnabled
        scrollThrottle={16}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        // renderAheadOffset={300}
        // onVisibleIndicesChanged={(i) => console.log(`i = ${i}`)}
        // disableRecycling
      />
    </>
  );
}

export default inject("store")(observer(RenderList));

const RowRenderer = (types, data: quranArray) => {
  const { width, height } = Dimensions.get("window");

  return (
    <RenderPage
      data={data}
      width={width}
      height={height}
      // extendedState={extendedState}
    />
  );
};
