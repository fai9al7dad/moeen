import React from "react";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { Box, Center, FlatList, Pressable, Text } from "native-base";
import { Dimensions } from "react-native";
import { mistakesColor } from "../../assets/conts/mistakes";
import { useState } from "react";
import { getRowById } from "../../utils/sqlite/getRowById";
import { quranRow } from "../../types/quran.types";
import { RFValue } from "../../utils/RFValue";
import { getWordByID } from "../../utils/sqlite/getWordById";
import ActionButton from "../../components/general/ActionButton";
import { updateWordColor } from "../../utils/sqlite/updateWordColor";
import quran from "../../stores/Quran";
import { MaterialIcons } from "@expo/vector-icons";
import { inject, observer } from "mobx-react";
import { observe } from "mobx";
const ViewWerdHighlights = ({ store, route, navigation }) => {
  const {
    username,
    type,
    isAccepted: paramIsAccepted,
    title,
    startSurah,
    endSurah,
    startVerseNumber,
    endVerseNumber,
    newTitle,
    newStartSurah,
    newEndSurah,
    newStartVerseNumber,
    newEndVerseNumber,
  } = route.params;
  const { currentWerdID: werdID } = store;
  const { width } = Dimensions.get("window");
  const [isAccepted, setIsAccepted] = useState(paramIsAccepted);
  const fetchWerdHighlight = React.useCallback(async () => {
    try {
      let res = await axios.get(`/api/highlight/werd-id/${werdID}`);
      let data = res.data;
      for (let i = 0; i < data?.length; i++) {
        const word: quranRow = await getWordByID(data[i].wordID);
        data[i].verseNumber = word.verseNumber;
        data[i].text = word.text;
        data[i].chapterCode = word.chapterCode;
        data[i].pageNumber = word.pageID;
      }

      return data;
    } catch (e: any) {
      console.log(e.response.data);

      throw new Error("لا يوجد أوراد بينكم");
    }
  }, []);
  const { isLoading, isError, data, error }: any = useQuery(
    "viewWerdHighlights",
    fetchWerdHighlight,
    { retry: 0 }
  );
  const queryClient = useQueryClient();
  const acceptHighlights = async () => {
    for (let i = 0; i < data?.length; i++) {
      let color = mistakesColor[data[i].type];
      await updateWordColor(color, data[i].wordID);
    }
    try {
      await axios.post("/api/werd/accept-werd", {
        werdID: werdID.toString(),
      });
      quran.initDataProvider();
      queryClient.refetchQueries("viewWirds");
    } catch (e: any) {
      console.log("e", e.response.data);
    } finally {
      setIsAccepted(true);
    }
  };

  if (isError || data?.length < 1) {
    return (
      <Box height={"100%"} justifyContent={"center"} alignItems="center">
        <Text
          textAlign={"center"}
          fontFamily="montserrat-bold"
          color="gray.800"
          fontSize={"xl"}
          mt={5}
        >
          لم تسجل أخطاء أو تنبيهات في هذا الورد
        </Text>
      </Box>
    );
  }
  return (
    <Box flex={1} mt={5} alignItems="center">
      <Box
        flexDirection={"row"}
        alignItems="center"
        justifyContent={"center"}
        flexWrap="wrap"
        px={5}
        mb={4}
      >
        {type !== "asReciter" ? (
          <Pressable
            bg="tertiary.300"
            borderWidth={1}
            borderRadius="lg"
            borderColor={"tertiary.400"}
            p={1}
            mr={3}
            onPress={() => {
              navigation.navigate("WerdMeta", {
                werdID,
                startSurah,
                endSurah,
                startVerseNumber,
                endVerseNumber,
                newTitle,
                newStartSurah,
                newEndSurah,
                newStartVerseNumber,
                newEndVerseNumber,
              });
            }}
          >
            <MaterialIcons name="mode-edit" size={18} color="#047857" />
          </Pressable>
        ) : null}
        <Text fontFamily="montserrat" textAlign={"left"}>
          {newTitle ? newTitle : title}
        </Text>
      </Box>
      <FlatList
        data={data}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        ItemSeparatorComponent={renderSeperator}
        contentContainerStyle={{
          backgroundColor: "#FFFCF7",
          width: width * 0.9,
          borderRadius: 10,
        }}
      />
      {type === "asReciter" && !isAccepted ? (
        <Box
          mb={10}
          width={"100%"}
          alignItems="center"
          justifyContent={"center"}
        >
          <ActionButton
            text="قبول"
            onPress={() => acceptHighlights()}
            style={{
              width: "90%",
            }}
          />
        </Box>
      ) : null}
      {type === "asReciter" && isAccepted ? (
        <Box
          mb={10}
          width={"100%"}
          alignItems="center"
          justifyContent={"center"}
        >
          <ActionButton
            text="تم القبول 👍"
            disabled={true}
            // onPress={() => acceptHighlights()}
            style={{
              width: "90%",
            }}
          />
        </Box>
      ) : null}
    </Box>
  );
};
const renderItem = ({ item, index }) => {
  return (
    <Box
      key={item.id}
      height={item_height}
      flexDirection="row"
      alignItems="center"
      justifyContent={"space-between"}
      px={5}
    >
      <Box flexDirection="row" alignItems="center">
        <Center
          w={7}
          h={7}
          rounded="md"
          bg={"tertiary.50"}
          borderWidth={0.5}
          borderColor="tertiary.200"
          mr={5}
        >
          <Text fontSize={"sm"} color="tertiary.700">
            {index + 1}
          </Text>
        </Center>

        <Box justifyContent={"space-between"} h={item_height} py={3}>
          <Box flexDirection={"row"} alignItems="center">
            <Box
              backgroundColor={
                item.type == "mistake"
                  ? mistakesColor.mistake
                  : mistakesColor.warning
              }
              width="2"
              height="2"
              mr="2"
              rounded="full"
            />
            <Text
              fontFamily={`p${item.pageNumber}`}
              fontSize={"xl"}
              lineHeight={RFValue(35)}
              color={"gray.800"}
              textAlign="left"
            >
              {item.text}
            </Text>
          </Box>
          <Box flexDirection={"row"} alignItems="center">
            <Text
              fontFamily={"surahname"}
              fontSize={"xl"}
              color={"gray.400"}
              textAlign="left"
            >
              {item.chapterCode}surah
            </Text>

            <Text
              fontFamily={"montserrat"}
              fontSize={"10"}
              color={"gray.400"}
              textAlign="left"
              mx={2}
            >
              رقم الصفحة: {item.pageNumber}
            </Text>
            <Text
              fontFamily={"montserrat"}
              fontSize={"10"}
              color={"gray.400"}
              textAlign="left"
            >
              رقم الأية: {item.verseNumber}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default inject("store")(observer(ViewWerdHighlights));
const renderSeperator = () => {
  return <Box borderWidth={0.5} borderColor="gray.200" />;
};

let item_height = 90;
const getItemLayout = (data, index) => {
  return {
    length: item_height,
    offset: item_height * index,
    index,
  };
};
