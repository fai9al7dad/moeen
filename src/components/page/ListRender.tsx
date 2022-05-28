import React, { useCallback, useContext, useMemo, useRef } from "react";

import { LayoutProvider, RecyclerListView } from "recyclerlistview";
import { Dimensions } from "react-native";
import RenderPage from "./RenderPage";
import { useNavigation } from "@react-navigation/native";
import { inject, observer } from "mobx-react";
import quran from "../../stores/Quran";
import { quranArray } from "../../types/quran.types";

function RenderList({ store, listRef, width, height }: any) {
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
        scrollThrottle={16}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        // pagingEnabled
        // onVisibleIndicesChanged={(i) => console.log(`i = ${i}`)}
        // disableRecycling
      />
    </>
  );
}

export default inject("store")(observer(RenderList));

const RowRenderer = (_, data: quranArray) => {
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
