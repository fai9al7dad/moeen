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
const AsCorrector = () => {
  const navigation: any = useNavigation();
  const { width } = Dimensions.get("window");
  const { isLoading, isError, data, error }: any = useQuery(
    "asCorrector",
    fetchAsCorrector,
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
          هنا تظهر الأوراد التي قد سمعتها مع شخص آخر كمصحح فقط
        </Text>
        <ActionButton
          text="إضافة مسمع"
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
    const textColor = "#ae8f74";

    return (
      <Pressable
        key={item.reciterID}
        height={item_height}
        flexDirection="row"
        alignItems="center"
        justifyContent={"space-between"}
        px={5}
        onPress={() =>
          navigation.navigate("ViewWirds", {
            duoID: item.id,
            username: item.reciter.username,
          })
        }
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
              {item.reciter.username}
            </Text>
            <Text
              fontFamily={"montserrat"}
              fontSize={"10"}
              color={"gray.400"}
              textAlign="left"
            >
              رقم المعرف: {item.reciter.id}
            </Text>
          </Box>
        </Box>
        <Box>
          <Ionicons
            name="ios-chevron-back-outline"
            size={18}
            color={"#059669"}
          />
        </Box>
      </Pressable>
    );
  };

  return (
    <Box flex={1} alignItems="center" mt={5} position="relative">
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

      <ActionButton
        text="إضافة مسمع"
        onPress={() => navigation.navigate("SearchDuo")}
        style={{ position: "absolute", bottom: 50, width: "90%" }}
      />
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
