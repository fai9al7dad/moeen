import { Dimensions } from "react-native";
import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import ActionButton from "../../components/general/ActionButton";
import { Box, Center, Spinner, Text } from "native-base";
import EmptyList from "../../components/svg/EmptyList";

const ViewWirds = ({ route }) => {
  const { duoID, username } = route.params;
  const { width } = Dimensions.get("window");
  const fetchWirds = React.useCallback(async () => {
    console.log("ftech");

    try {
      let res = await axios.get(`/api/werd/duo-id/${duoID}`);
      console.log("res", res.data);

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
          هنا تظهر الأوراد التي قد سمعتها مع{" "}
          <Text fontFamily={"montserrat-bold"} color="tertiary.600">
            {username}
          </Text>
        </Text>
        <ActionButton
          text="بدء ورد جديد"
          onPress={() => navigation.navigate("SearchDuo")}
          style={{
            width: "90%",
            marginTop: 80,
          }}
        />
      </Box>
    );
  }
  return (
    <Box>
      <Text>{duoID}</Text>
    </Box>
  );
};

export default ViewWirds;
