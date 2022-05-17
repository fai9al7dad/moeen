import { Box, Text, Pressable } from "native-base";
import React, { useCallback, useContext, useRef } from "react";

import { RecyclerListView } from "recyclerlistview";
import { Dimensions } from "react-native";
import RenderPage from "./RenderPage";
import { QuranContext } from "../../providers/QuranProvider";

const ListRender = ({ navigation }) => {
  const { dataProvider, layoutProvider } = useContext(QuranContext);
  const { width, height } = Dimensions.get("window");

  const listRef: any = useRef(null);

  const scrollFunc = useCallback((index: number) => {
    if (listRef.current) {
      listRef.current.scrollToIndex(index);
    }
  }, []);

  const rowRenderer = (type, data) => {
    return (
      <RenderPage
        data={data}
        width={width}
        scrollFunc={scrollFunc}
        height={height}
        navigation={navigation}
      />
    );
  };

  return (
    <Box flex={1}>
      {dataProvider._data.length > 10 ? (
        <RecyclerListView
          // initialScrollIndex={5}
          ref={listRef}
          dataProvider={dataProvider}
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
          disableRecycling
        />
      ) : null}
    </Box>
  );
};

export default ListRender;
