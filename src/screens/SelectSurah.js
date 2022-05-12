import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, FlatList, Pressable, Text } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import RenderSurah from "../components/selectSurah/RenderSurah";

const SelectSurah = ({ navigation }) => {
  const [surahs, setSurahs] = useState(null);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const fetchSurahs = async () => {
        let res = await axios.get(
          "https://api.quran.com/api/v4/chapters?language=en"
        );
        let chapters = res.data?.chapters;
        // console.log(chapters);
        setSurahs(chapters);
      };
      fetchSurahs();
    }
    return () => (mounted = false);
  });

  const renderSeperator = () => {
    return <Box borderWidth={0.5} borderColor="gray.300" />;
  };
  const getItemLayout = (data, index) => {
    let item_height = 104;
    return {
      length: item_height,
      offset: item_height * index,
      index,
    };
  };
  return (
    <SafeAreaView>
      <FlatList
        contentInsetAdjustmentBehavior="automatic"
        keyExtractor={(item) => item.id.toString()}
        data={surahs}
        renderItem={({ item }) => (
          <RenderSurah item={item} navigation={navigation} />
        )}
        disableVirtualization
        getItemLayout={getItemLayout}
        ItemSeparatorComponent={renderSeperator}
      />
    </SafeAreaView>
  );
};
export default SelectSurah;
