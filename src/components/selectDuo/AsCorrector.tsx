import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Box, Center, Spinner, Text } from "native-base";

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
const AsCorrector = () => {
  const { isLoading, isError, data, error }: any = useQuery(
    "asCorrector",
    fetchAsCorrector
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
        return <Text key={item.reciterID}>{item.corrector.username}</Text>;
      })}
    </Box>
  );
};

export default AsCorrector;
