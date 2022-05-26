import React from "react";
import { HStack, VStack, Text, Box, Pressable } from "native-base";
import { SafeAreaView } from "react-native";
import { mistakesColor } from "../../assets/conts/mistakes";
import { inject, observer } from "mobx-react";
import { useNavigation } from "@react-navigation/native";
import SelectPageNumber from "./SelectPageNumber";
import { Entypo } from "@expo/vector-icons";
import RenderMistakesAndWarnings from "./components/RenderMistakesAndWarnings";
import HeaderDuoOrWerd from "./components/HeaderDuoOrWerd";
import { quranArray, quranRow } from "../../types/quran.types";
const PageHeader: React.FC<quranArray> = React.memo(
  ({ data }) => {
    const navigation: any = useNavigation();
    const textColor = "#ae8f74";

    return (
      <SafeAreaView>
        <HStack
          justifyContent={"space-between"}
          alignItems="center"
          px={2}
          // maxHeight="7"
        >
          <HStack flex={1} justifyContent="flex-start" alignItems={"center"}>
            <HeaderDuoOrWerd />
            <Pressable onPress={() => navigation.navigate("SelectSurah")}>
              <Text fontSize={"xl"} fontFamily="surahname" color={textColor}>
                {data[0].chapterCode}surah
              </Text>
            </Pressable>
            <Box
              justifyContent={"center"}
              alignItems="center"
              p="0.5"
              rounded="lg"
              backgroundColor="#f7f0e7"
              ml="1"
            >
              <Entypo name="select-arrows" size={10} color="#ae8f74" />
            </Box>
          </HStack>
          <Box>
            <HStack flex={1} justifyContent="center" alignItems={"center"}>
              <RenderMistakesAndWarnings
                textColor={textColor}
                pageNumber={data[0].pageNumber}
              />
              <SelectPageNumber data={data[0]} textColor={textColor} />
            </HStack>
          </Box>

          <VStack
            flex={1}
            flexDirection="row"
            alignItems={"center"}
            justifyContent="flex-end"
          >
            <Text
              fontSize={"xs"}
              mr={2}
              color={textColor}
              fontWeight="bold"
              fontFamily={"montserrat"}
            >
              الجزء {data[0]?.juzNumber}
            </Text>

            <Text
              fontSize={"xs"}
              color={textColor}
              fontWeight="bold"
              fontFamily={"montserrat"}
            >
              الحزب {data[0]?.hizbNumber}
            </Text>
          </VStack>
        </HStack>
      </SafeAreaView>
    );
  },
  (p, n) => {
    return p.data[0].pageNumber === n.data[0].pageNumber;
  }
);

export default PageHeader;
