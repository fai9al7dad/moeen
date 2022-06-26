import React from "react";
import { Box, Text } from "native-base";
import { Dimensions, Platform, StyleSheet } from "react-native";
import { RFValue } from "../../../utils/RFValue";
import LineWords from "./LineWords";
import { LineType } from "../../../assets/types";

const Line: React.FC<LineType> = React.memo(
  ({ id, pageID, words }) => {
    // const data:Line = props.data
    let isIos = Platform.OS === "ios";
    let lineWords: any = [];
    const { width } = Dimensions.get("window");
    return (
      <Box justifyContent="center" alignItems={"center"} w={"100%"}>
        <Text
          fontFamily={"p" + pageID} // this line causes leak
          fontSize={isIos ? RFValue(18.5) : RFValue(20)}
          allowFontScaling={false}
          textAlign="center"
          pt={isIos ? 1 : 0}
          px={1}
          lineHeight={RFValue(36)}
          style={styles.customShadow}
        >
          {words.map((item, index) => {
            return (
              <LineWords
                {...item}
                index={index}
                key={item.id}
                pageID={pageID}
              />
            );
          })}
        </Text>
      </Box>
    );
  },
  (p, n) => {
    return n.words[0].id === p.words[0].id;
  }
);

const styles = StyleSheet.create({
  customShadow: {
    textShadowColor: "#000",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 0.4,
  },
});

export default Line;
