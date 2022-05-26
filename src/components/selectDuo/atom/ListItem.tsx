import { Box, Center, Pressable, Text } from "native-base";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface props {
  itemHeight: number;
  onPress: any;
  index: number;
  title: string;
  id: number;
}
const ListItem: React.FC<props> = ({
  itemHeight,
  onPress,
  index,
  title,
  id,
}) => {
  return (
    <Pressable
      key={id}
      height={itemHeight}
      flexDirection="row"
      alignItems="center"
      justifyContent={"space-between"}
      px={5}
      onPress={onPress}
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
            {title}
          </Text>
          <Text
            fontFamily={"montserrat"}
            fontSize={"10"}
            color={"gray.400"}
            textAlign="left"
          >
            رقم المعرف: {id}
          </Text>
        </Box>
      </Box>
      <Box>
        <Ionicons name="ios-chevron-back-outline" size={18} color={"#059669"} />
      </Box>
    </Pressable>
  );
};

export default ListItem;
