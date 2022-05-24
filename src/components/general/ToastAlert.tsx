import { Box, Pressable, Slide, Text } from "native-base";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import { useState } from "react";

interface props {
  type: "success" | "error";
  header: string;
  message: string;
}
const ToastAlert: React.FC<props> = ({ type, header, message }) => {
  const [showAlert, setShowAlert] = useState(true);
  const { width, height } = Dimensions.get("window");
  let colorScheme = {
    background: type === "success" ? "green.200" : "red.200",
    borderColor: type === "success" ? "green.300" : "red.300",
    headerText: type === "success" ? "green.700" : "red.700",
    messageText: type === "success" ? "green.500" : "red.500",
  };
  setTimeout(() => {
    setShowAlert(false);
  }, 3000);
  return (
    // placement: "top",
    <Slide in={showAlert} placement="top" top={height * 0.05}>
      <Box justifyContent={"center"} alignItems="center">
        <Box
          bg={colorScheme.background}
          width={width * 0.95}
          borderWidth={1}
          borderColor={colorScheme.borderColor}
          py="5"
          rounded="md"
          flexDirection={"row"}
          flexWrap="wrap"
          alignItems="center"
          justifyContent={"flex-start"}
          px="2"
          mb={5}
        >
          <Box
            width={10}
            height={10}
            rounded="full"
            justifyContent={"flex-start"}
            alignItems="flex-start"
          >
            {type === "error" ? (
              <MaterialCommunityIcons
                name="shield-alert-outline"
                size={27}
                color="#ef4444"
              />
            ) : (
              <MaterialCommunityIcons
                name="shield-check-outline"
                size={27}
                color={colorScheme.headerText}
              />
            )}
          </Box>
          <Box>
            <Text
              color={colorScheme.headerText}
              fontFamily={"montserrat"}
              textAlign="left"
            >
              {header}
            </Text>
            <Text
              color={colorScheme.messageText}
              fontFamily={"montserrat"}
              textAlign="left"
            >
              {message}
            </Text>
          </Box>
        </Box>
      </Box>
    </Slide>
  );
};

export default ToastAlert;
