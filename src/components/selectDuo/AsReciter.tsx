import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Box, Center, Spinner, Text } from "native-base";
import EmptyList from "../svg/EmptyList";
import { Dimensions, FlatList } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

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
  const { isLoading, isError, data, error }: any = useQuery(
    "asReciter",
    fetchAsReciter
  );
  const { width } = Dimensions.get("window");

  if (isLoading) {
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
const renderItem = ({ item, index }) => {
  const textColor = "#ae8f74";

  return (
    <Box
      key={item.corrector.id}
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
        <Box>
          <Text
            fontFamily={"montserrat"}
            fontSize={"lg"}
            color={"gray.800"}
            textAlign="left"
          >
            {item.corrector.username}
          </Text>
          <Text
            fontFamily={"montserrat"}
            fontSize={"10"}
            color={"gray.400"}
            textAlign="left"
          >
            رقم المعرف: {item.corrector.id}
          </Text>
        </Box>
      </Box>
      <Box>
        <Ionicons name="ios-chevron-back-outline" size={18} color={"#059669"} />
      </Box>
    </Box>
  );
};
