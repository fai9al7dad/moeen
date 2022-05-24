import { useNavigation } from "@react-navigation/native";
import { Box, Button, Text } from "native-base";
import React from "react";
import Warning from "../svg/Warning";

const NotAuthAlert = () => {
  const navigation = useNavigation();
  return (
    <Box alignItems="center" justifyContent={"center"} height="100%">
      <Warning />
      <Text
        color="gray.800"
        fontSize="2xl"
        fontFamily="montserrat-bold"
        textAlign={"center"}
        mt={8}
      >
        تحتاج لأن تكون مسجل الدخول للإستمرار
      </Text>
      <Button
        onPress={() => navigation.navigate("Login")}
        mt="5"
        py="5"
        px={5}
        shadow={"3"}
        backgroundColor="tertiary.500"
        rounded={"lg"}
      >
        <Text
          color="white"
          fontFamily={"montserrat-bold"}
          textAlign="center"
          fontSize={"md"}
        >
          تسجيل الدخول | تسجيل حساب
        </Text>
      </Button>
    </Box>
  );
};

export default NotAuthAlert;
