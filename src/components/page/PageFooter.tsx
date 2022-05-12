import React from "react";
import { HStack, VStack, Text, Box } from "native-base";

const PageFooter = ({ data }) => {
  let textColor = "#ae8f74";
  let isEven = data[0]?.pageNumber % 2 === 0;
  return (
    <Box
      position={"absolute"}
      bottom={6}
      width="100%"
      borderTopWidth={0.5}
      borderTopColor="#f7ecdd"
      px="5"
      pt="1"
      flexDirection="row"
      justifyContent={isEven ? "flex-end" : "flex-start"}
    >
      <Text fontWeight={"bold"} fontSize="xs" color="#ae8f74">
        {data[0]?.pageNumber}
      </Text>
    </Box>
  );
};

export default PageFooter;
