import React from "react";
import { Box, Pressable, Text } from "native-base";
import { mistakesColor } from "../../assets/conts/mistakes";

const RenderSurah = React.memo(
  ({ item, navigation, width, height }) => {
    const textColor = "#ae8f74";
    return (
      <Pressable
        width={width}
        height={height}
        flexDirection={"row"}
        alignItems="center"
        justifyContent={"space-between"}
        p={4}
        onPress={() =>
          navigation.navigate("Quran", { pageNumber: item.pages[0] - 1 })
        }
        key={item.id}
      >
        <Box flexDirection={"row"} alignItems="center">
          <Text fontSize={"sm"} color="gray.400">
            {item.id}
          </Text>
          <Box ml={5}>
            <Box flexDirection="row" alignItems="center">
              <Text
                fontFamily={"surahname"}
                textAlign={"left"}
                fontSize={"4xl"}
              >
                {("00" + item.id).slice(-3)}
              </Text>
            </Box>

            <Text textAlign={"left"} fontSize="xs">
              {item.revelation_place === "madinah" ? "مدنية" : "مكية"}، عدد
              صفحاتها {item.pages[1] - item.pages[0] + 1}، {"عدد آياتها "}
              {item.verses_count}
            </Text>
          </Box>
        </Box>
        <Box alignItems={"flex-end"}>
          <Text color={textColor}>
            {item.pages[1]} - {item.pages[0]}
          </Text>
          <Box flexDirection={"row"} alignItems="center" mt={2}>
            {item.mistakes > 0 ? (
              <>
                <Box
                  backgroundColor={mistakesColor.mistake}
                  width="2"
                  height="2"
                  mr="0.5"
                  rounded="full"
                />
                <Box>
                  <Text fontSize={"xs"} fontWeight="bold" color={textColor}>
                    {item.mistakes}
                  </Text>
                </Box>
              </>
            ) : null}
            {item.warnings > 0 ? (
              <>
                <Box
                  backgroundColor={mistakesColor.warning}
                  width="2"
                  height="2"
                  mr="0.5"
                  ml={2}
                  rounded="full"
                />
                <Box>
                  <Text fontSize={"xs"} fontWeight="bold" color={textColor}>
                    {item.warnings}
                  </Text>
                </Box>
              </>
            ) : null}
          </Box>
        </Box>
      </Pressable>
    );
  },
  (prev, next) => {
    return prev.id === next.id;
  }
);

export default RenderSurah;
