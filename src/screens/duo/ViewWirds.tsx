import { Dimensions, FlatList } from "react-native";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import ActionButton from "../../components/general/ActionButton";
import { Box, Center, Spinner, Text } from "native-base";
import EmptyList from "../../components/svg/EmptyList";
import store from "../../stores/Store";
import ListItem from "../../components/selectDuo/atom/ListItem";
import { WerdDataContext } from "../../contexts/WerdDataContext";

const ViewWirds = ({ route, navigation }) => {
  const { duoID, username, type } = route.params;
  const { width } = Dimensions.get("window");
  // useEffect(() => {
  //   navigation.setOptions({ headerTitle: `${username} ` });
  // }, []);

  const fetchWirds = React.useCallback(async () => {
    try {
      let res = await axios.get(`/api/werd/duo-id/${duoID}`);

      return res.data;
    } catch (e: any) {
      console.log(e.response.data);

      throw new Error("لا يوجد أوراد بينكم");
    }
  }, []);
  const { isLoading, isError, data, error }: any = useQuery(
    "viewWirds",
    fetchWirds,
    { retry: 0 }
  );

  if (isLoading) {
    return (
      <Center w="100%" height="100%">
        <Spinner />
      </Center>
    );
  }
  if (isError) {
    return (
      <Box height={"100%"} justifyContent={"center"} alignItems="center">
        <EmptyList />
        <Text
          textAlign={"center"}
          fontFamily="montserrat-bold"
          color="gray.800"
          fontSize={"2xl"}
          mt={5}
        >
          {error.message}
        </Text>
        <Text
          textAlign={"center"}
          fontFamily="montserrat"
          color="gray.500"
          fontSize={"md"}
          mt={5}
        >
          هنا تظهر الأوراد التي سبق أن سمعتها مع{" "}
          <Text fontFamily={"montserrat-bold"} color="tertiary.600">
            {username}
          </Text>{" "}
          {type === "asCorrector" ? "كمعلم" : "كطالب"}
        </Text>
        {type === "asCorrector" ? (
          <ActionButton
            text="بدء ورد جديد"
            onPress={() => startWird(duoID, username, navigation)}
            style={{
              width: "90%",
              marginTop: 80,
            }}
          />
        ) : null}
      </Box>
    );
  }

  const renderItem = ({ item, index }) => {
    let createdAtD = new Date(item.createdAt);
    let createdAtDate =
      createdAtD.getFullYear() +
      "-" +
      createdAtD.getDate() +
      "-" +
      createdAtD.getDay();

    let title = "";
    if (item.startSurah !== null) {
      title = `${item.startSurah ? item.startSurah : ""} ${
        item.startVerseNumber ? item.startVerseNumber : ""
      } ${item.endSurah ? "- " + item.endSurah : ""} ${
        item.endVerseNumber ? item.endVerseNumber : ""
      }`;
    } else {
      title = createdAtDate;
    }
    const onPress = () => {
      store.currentWerdID = item.id;
      navigation.navigate("ViewWerdsHighlights", {
        title: title,
        username: username,
        type: type,
        isAccepted: item.isAccepted,
        startSurah: item.startSurah,
        endSurah: item.endSurah,
        startVerseNumber: item.startVerseNumber,
        endVerseNumber: item.endVerseNumber,
      });
    };
    return (
      <ListItem
        id={item.id}
        index={index}
        title={title}
        itemHeight={item_height}
        createdAtDate={createdAtDate}
        isWirdAccepted={item.isAccepted}
        onPress={onPress}
      />
    );
  };
  return (
    <Box flex={1} mt={5} alignItems="center">
      <FlatList
        keyExtractor={(item) => item.id.toString()}
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
      {type === "asCorrector" ? (
        <Box
          mb={10}
          width={"100%"}
          alignItems="center"
          justifyContent={"center"}
        >
          <ActionButton
            text="بدء ورد جديد"
            onPress={() => startWird(duoID, username, navigation)}
            style={{
              width: "90%",
            }}
          />
        </Box>
      ) : null}
    </Box>
  );
};

export default ViewWirds;

const startWird = async (duoID: number, username: string, navigation: any) => {
  try {
    // create werd
    let res = await axios.post("/api/werd/add", { duoID: duoID.toString() });
    let werd = res.data;
    // store werd id
    navigation.navigate("StartOrFinishWerdMeta", {
      isStart: true,
      werdID: werd?.id,
      username: username,
      duoID: duoID,
    });
  } catch (e: any) {
    console.log(e.response.data);
  }
};

const renderSeperator = () => {
  return <Box borderWidth={0.5} borderColor="gray.200" />;
};

let item_height = 70;
const getItemLayout = (data, index) => {
  return {
    length: item_height,
    offset: item_height * index,
    index,
  };
};
