import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, FlatList, Pressable, Text } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import RenderSurah from "../components/selectSurah/RenderSurah";
import SURAHS from "../assets/json/SURAHS.json";
import { openDatabase } from "expo-sqlite";
import { getChapterMistakesAndWarnings } from "../utils/sqlite/getChapterMistakesAndWarnings";
import { mistakesColor } from "../assets/conts/mistakes";
import { ActivityIndicator, Dimensions } from "react-native";

const SelectSurah = ({ navigation }) => {
  const [finished, setFinished] = useState(false);
  const { height } = Dimensions.get("window");
  const renderSeperator = () => {
    return <Box borderWidth={0.5} borderColor="gray.300" />;
  };
  useEffect(() => {
    const get = async () => {
      for (let i = 0; i < SURAHS.chapters.length; i++) {
        // to start chapter from 1
        let chapterIndex = i + 1;
        let chapterPrefix = ("00" + chapterIndex).slice(-3);
        const mistakes = await getChapterMistakesAndWarnings(
          mistakesColor.mistake,
          chapterPrefix
        );

        const warnings = await getChapterMistakesAndWarnings(
          mistakesColor.warning,
          chapterPrefix
        );

        SURAHS.chapters[i].mistakes = mistakes?.mistakes;
        SURAHS.chapters[i].warnings = warnings?.warnings;
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
  return (
    <Box>
      {finished ? (
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
      ) : (
        <Box
          height={height * 0.8}
          justifyContent="center"
          alignItems={"center"}
        >
          <ActivityIndicator />
        </Box>
      )}
    </Box>
  );
};
export default SelectSurah;
