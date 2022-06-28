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
const AllDuos = () => {
  const navigation: any = useNavigation();
  const { width } = Dimensions.get("window");

  const fetchAllDuos = async () => {
    try {
      let res = await axios.get("/api/duo/all-duos");

      return res.data;
    } catch (e: any) {
      if (e.response.status === 404) {
        throw new Error("لا يوجد لديك ثنائيات");
      }
    }
  };

  const { isError, data, error, isFetching }: any = useQuery(
    "allDuos",
    fetchAllDuos
    // { retry: 0 }
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
      </Box>
    );
  }

  const renderItem = ({ item, index }) => {
    return (
      <ListItem
        title={item.username}
        id={item.id}
        itemHeight={item_height}
        key={item.id}
        createdAtDate={item?.createdAt}
        index={index}
        onPress={() => {
          navigation.navigate("ViewWirds", {
            duoID: item.id,
            username: item.username,
            reciterID: item.id,
          });
        }}
      />
    );
  };

  return (
    <Box flex={1} alignItems="center" mt={5}>
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
    </Box>
  );
};

export default AllDuos;
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
