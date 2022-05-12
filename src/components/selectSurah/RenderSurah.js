import React from "react";
import { Box, Pressable, Text } from "native-base";

const RenderSurah = ({ item, navigation }) => {
  return (
    <Pressable
      flexDirection={"row"}
      alignItems="center"
      justifyContent={"space-between"}
      p={4}
      onPress={() =>
        navigation.navigate("Home", { pageNumber: item.pages[0] - 1 })
      }
      key={item.id}
    >
      <Box flexDirection={"row"} alignItems="center">
        <Text fontSize={"sm"} color="gray.400">
          {item.id}
        </Text>
        <Box ml={5}>
          <Text fontFamily={"surahname"} textAlign={"left"} fontSize={"4xl"}>
            {("00" + item.id).slice(-3)}
          </Text>
          <Text textAlign={"left"} fontSize="xs">
            {item.revelation_place === "madinah" ? "مدنية" : "مكية"}، عدد
            صفحاتها {item.pages[1] - item.pages[0] + 1}، {"عدد آياتها "}
            {item.verses_count}
          </Text>
        </Box>
      </Box>
      <Box>
        <Text>
          {item.pages[1]} - {item.pages[0]}
        </Text>
      </Box>
    </Pressable>
  );
};

function arePropsEqual(prev, next) {
  return prev.id === next.id;
}

export default React.memo(RenderSurah, arePropsEqual);