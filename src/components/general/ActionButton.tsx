import { Pressable, Text } from "native-base";
import React from "react";

interface props {
  onPress: any;
  text: string;
  style?: object;
}
const ActionButton: React.FC<props> = ({ onPress, text, style }) => {
  return (
    <Pressable
      onPress={onPress}
      mt="2"
      py="4"
      // shadow={"3"}
      borderBottomWidth={5}
      borderBottomColor="tertiary.700"
      backgroundColor="tertiary.500"
      rounded={"lg"}
      style={style}
    >
      <Text
        color="white"
        fontFamily={"montserrat-bold"}
        textAlign="center"
        fontSize={"lg"}
      >
        {text}
      </Text>
    </Pressable>
  );
};

export default ActionButton;
