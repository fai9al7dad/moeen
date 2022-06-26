import React from "react";
import { HStack, VStack, Text, Box, Pressable } from "native-base";
import { Platform, SafeAreaView, StyleSheet } from "react-native";
import { mistakesColor } from "../../assets/conts/mistakes";
import { inject, observer } from "mobx-react";
import { useNavigation } from "@react-navigation/native";
import SelectPageNumber from "./SelectPageNumber";
import { Entypo } from "@expo/vector-icons";
import RenderMistakesAndWarnings from "./components/RenderMistakesAndWarnings";
import HeaderDuoOrWerd from "./components/HeaderDuoOrWerd";
import { quranArray, quranRow } from "../../types/quran.types";
import { RFValue } from "../../utils/RFValue";
const PageHeader: React.FC<any> = React.memo(
  ({ data }: any) => {
    const navigation: any = useNavigation();
    const textColor = "#ae8f74";
    let meta = data;
    return (
      <SafeAreaView style={styles.droidSafeArea}>
        <HStack
          justifyContent={"space-between"}
          alignItems="center"
          px={2.5}
          // maxHeight="7"
        >
          <HStack flex={1} justifyContent="flex-start" alignItems={"center"}>
            <HeaderDuoOrWerd />
            <Pressable onPress={() => navigation.navigate("SelectSurah")}>
              <Text
                fontSize={"xl"}
                fontFamily="surahname"
                color={textColor}
                allowFontScaling={false}
              >
                {meta.chapterCode}surah
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
                pageNumber={data.id}
              />
              <SelectPageNumber data={data} textColor={textColor} />
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
              allowFontScaling={false}
              fontFamily={"montserrat"}
            >
              الجزء {data?.juzNumber}
            </Text>

            <Text
              fontSize={"xs"}
              color={textColor}
              fontWeight="bold"
              fontFamily={"montserrat"}
              allowFontScaling={false}
            >
              الحزب {data?.hizbNumber}
            </Text>
          </VStack>
        </HStack>
      </SafeAreaView>
    );
  },
  (p, n) => {
    return p.data.id === n.data.id;
  }
);
const styles = StyleSheet.create({
  droidSafeArea: {
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
});
export default PageHeader;
