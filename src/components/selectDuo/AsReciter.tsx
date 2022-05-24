import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Box, Center, Spinner, Text } from "native-base";
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
  if (isLoading) {
    return (
      <Center w="100%" height="100%">
        <Spinner />
      </Center>
    );
  }
  if (isError) {
    return <Box>Error: {error.message}</Box>;
  }
  return (
    <Box>
      {data?.map((item) => {
        return <Text key={item.correctorID}>{item.reciter.username}</Text>;
      })}
    </Box>
  );
};

export default AsReciter;
