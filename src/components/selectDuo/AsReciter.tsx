import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Box, Center, Spinner, Text } from "native-base";
import EmptyList from "../svg/EmptyList";
import { Dimensions, FlatList } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ListItem from "./atom/ListItem";

const fetchAsReciter = async () => {
  try {
    let res = await axios.get("/api/duo/reciter");
    return res.data;
  } catch (e: any) {
    if (e.response.status === 404) {
      throw new Error("لا يوجد ثنائي أنت فيه كمسمع");
    }
  }
};

const AsReciter = () => {
  const { isError, data, error, isFetching }: any = useQuery(
    "asReciter",
    fetchAsReciter
  );
  const { width } = Dimensions.get("window");
  const navigation: any = useNavigation();
  if (isFetching) {
    return (
      <Center w="100%" height="100%">
        <Spinner />
      </Center>
    );
  }
  if (isError) {
    return (
      <Box height={"90%"} justifyContent={"center"} alignItems="center">
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
          هنا تظهر الأوراد التي قد سمعتها مع شخص آخر كمسمع فقط
        </Text>
      </Box>
    );
  }

  const renderItem = ({ item, index }) => {
    return (
      <ListItem
        title={item.corrector.username}
        id={item.corrector.id}
        itemHeight={item_height}
        key={item.corrector.id}
        index={index}
        onPress={() => {
          navigation.navigate("ViewWirds", {
            duoID: item.id,
            username: item.corrector.username,
            type: "asReciter",
          });
        }}
      />
    );
  };
  return (
    <Box flex={1} alignItems="center" mt={5} position="relative">
      <FlatList
        keyExtractor={(item) => item.corrector.id.toString()}
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

export default AsReciter;
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
