import React from "react";
import { Box, Pressable, Text } from "native-base";

const Footer = ({ height, navigation }) => {
  return (
    <Box
      position={"absolute"}
      bottom={0}
      bg="red.400"
      width={"100%"}
      height={height * 0.1}
      zIndex={999}
    >
      <Box flexDirection={"row"} alignItems="center">
        <Pressable onPress={() => navigation.navigate("SelectSurah")}>
          <Text>select surah</Text>
        </Pressable>
      </Box>
    </Box>
  );
};

export default Footer;
