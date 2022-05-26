import { Dimensions, FlatList } from "react-native";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import ActionButton from "../../components/general/ActionButton";
import { Box, Center, Spinner, Text } from "native-base";
import EmptyList from "../../components/svg/EmptyList";
import store from "../../stores/Store";
import ListItem from "../../components/selectDuo/atom/ListItem";

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
          {type === "asCorrector" ? "كمصحح" : "كمسمع"}
        </Text>
        <ActionButton
          text="بدء ورد جديد"
          onPress={() => startWird(duoID, username, navigation)}
          style={{
            width: "90%",
            marginTop: 80,
          }}
        />
      </Box>
    );
  }

  const renderItem = ({ item, index }) => {
    return (
      <ListItem
        id={item.id}
        index={index}
        title={item.id.toString()}
        itemHeight={item_height}
        onPress={() =>
          navigation.navigate("ViewWerdsHighlights", {
            werdID: item.id,
            username: username,
          })
        }
      />
    );
  };
  return (
    <Box flex={1} alignItems="center">
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
    store.startWerd(werd?.id, duoID, username);
    navigation.navigate("Quran");
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
