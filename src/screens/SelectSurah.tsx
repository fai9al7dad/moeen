import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, FlatList, Skeleton } from "native-base";
import RenderSurah from "../components/selectSurah/RenderSurah";
import SURAHS from "../assets/json/SURAHS.json";
import { getChapterMistakesAndWarnings } from "../utils/sqlite/getChapterMistakesAndWarnings";
import { mistakesColor } from "../assets/conts/mistakes";
import { Dimensions } from "react-native";
import colorsModel from "../utils/sqlite/model/colorsModel";

const SelectSurah = ({ navigation }) => {
  const [finished, setFinished] = useState(false);
  const renderSeperator = () => {
    return <Box borderWidth={0.5} borderColor="gray.300" />;
  };
  useEffect(() => {
    const get = async () => {
      for (let i = 0; i < SURAHS.chapters.length; i++) {
        // to start chapter from 1
        let chapterIndex = i + 1;
        let chapterPrefix = ("00" + chapterIndex).slice(-3);
        const mistakes: any = await colorsModel.getChapterMistakesAndWarnings({
          wordColor: mistakesColor.mistake,
          chapterCode: chapterPrefix,
        });
        const warnings: any = await colorsModel.getChapterMistakesAndWarnings({
          wordColor: mistakesColor.warning,
          chapterCode: chapterPrefix,
        });

        SURAHS.chapters[i].mistakes = mistakes[0]?.mistakes;
        SURAHS.chapters[i].warnings = warnings[0]?.warnings;
      }
      setFinished(true);
    };
    get();
  }, []);
  const getItemLayout = (data, index) => {
    let item_height = 104;
    return {
      length: item_height,
      offset: item_height * index,
      index,
    };
  };
  let cards = [];
  for (let i = 0; i < 15; i++) {
    cards[i] = LoadingSkeleton;
  }
  if (!finished) {
    return (
      <>
        {cards.map((item, index) => {
          return <LoadingSkeleton key={index} />;
        })}
      </>
    );
  }
  return (
    <Box>
      <FlatList
        contentInsetAdjustmentBehavior="automatic"
        keyExtractor={(item) => item.id.toString()}
        data={SURAHS.chapters}
        renderItem={({ item }) => (
          <RenderSurah item={item} navigation={navigation} />
        )}
        disableVirtualization
        getItemLayout={getItemLayout}
        ItemSeparatorComponent={renderSeperator}
      />
    </Box>
  );
};
export default SelectSurah;

const LoadingSkeleton = () => {
  const { height } = Dimensions.get("window");

  let itemHeight = height * 0.02;
  return (
    <Box
      flexDirection={"row"}
      alignItems="center"
      justifyContent={"space-between"}
      px={2}
      mt={2}
    >
      <Box flexDirection="row" alignItems="center">
        <Box>
          <Skeleton
            width={"5"}
            height={itemHeight}
            mr={5}
            rounded="full"
            mt={5}
          />
        </Box>
        <Box width={"70%"}>
          <Skeleton width={"50%"} height={itemHeight} rounded="lg" mt={5} />
          <Skeleton width={"80%"} height={"3"} rounded="lg" mt={5} />
        </Box>
        <Box width={"20%"} alignItems="flex-end" pr={5}>
          <Skeleton width={"80%"} height={itemHeight} rounded="lg" mt={5} />
          <Skeleton width={"100%"} height={"3"} rounded="lg" mt={5} />
        </Box>
      </Box>
    </Box>
  );
};
