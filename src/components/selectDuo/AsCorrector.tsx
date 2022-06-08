import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Box, Center, Pressable, Spinner, Text } from "native-base";
import { Dimensions, FlatList } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import EmptyList from "../svg/EmptyList";
import { useNavigation } from "@react-navigation/native";
import ActionButton from "../general/ActionButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../assets/types";
import ListItem from "./atom/ListItem";
const AsCorrector = () => {
  const navigation: any = useNavigation();
  const { width } = Dimensions.get("window");
  const { isError, data, error, isFetching }: any = useQuery(
    "asCorrector",
    fetchAsCorrector,
    { retry: 0 }
  );
  if (isFetching) {
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
          {/* {error.message} */}
        </Text>
        <Text
          textAlign={"center"}
          fontFamily="montserrat"
          color="gray.500"
          fontSize={"md"}
          mt={5}
        >
          لا يوجد لديك طلاب
        </Text>
        <ActionButton
          text="إضافة طالب"
          onPress={() => navigation.navigate("SearchDuo")}
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
        title={item.reciter.username}
        id={item.reciter.id}
        itemHeight={item_height}
        key={item.reciter.id}
        index={index}
        onPress={() => {
          navigation.navigate("ViewWirds", {
            duoID: item.id,
            username: item.reciter.username,
            type: "asCorrector",
          });
        }}
      />
    );
  };

  return (
    <Box flex={1} alignItems="center" mt={5}>
      <FlatList
        keyExtractor={(item) => item.reciter.id.toString()}
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

      <Box mb={10} width={"100%"} alignItems="center" justifyContent={"center"}>
        <ActionButton
          text="إضافة مسمع"
          onPress={() => navigation.navigate("SearchDuo")}
          style={{ width: "90%" }}
        />
      </Box>
    </Box>
  );
};

export default AsCorrector;
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

const fetchAsCorrector = async () => {
  try {
    let res = await axios.get("/api/duo/corrector");

    return res.data;
  } catch (e: any) {
    if (e.response.status === 404) {
      throw new Error("لا يوجد ثنائي أنت فيه كمصحح");
    }
  }
};
