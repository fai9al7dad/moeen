import { Box, Image, Text } from "native-base";
import React from "react";
import { Dimensions } from "react-native";
import logo from "../../assets/img/logo.png";
const AboutApp = () => {
  const { width } = Dimensions.get("window");

  return (
    <Box mt={5} alignItems="center" justifyContent="center">
      <Image
        source={logo}
        style={{ width: 100, height: 100 }}
        rounded="lg"
        alt="logo"
        mb={1}
      />
      <Text fontFamily={"montserrat"} textAlign="center" mb={5} color="#ae8f74">
        الإصدار 1.0.0
      </Text>
      <Box
        bg="#FFFCF7"
        w={width * 0.9}
        borderWidth={1}
        justifyContent="flex-end"
        borderColor="gray.100"
        rounded="lg"
        px={4}
        py={4}
      >
        <Text
          fontFamily={"montserrat"}
          textAlign="left"
          color={"gray.700"}
          fontSize="13"
        >
          تطبيق معين هو تطبيق يهدف الى المساعدة في تقوية الحفظ وتثبيت المراجعة
          عن طريق معرفة نقاط الضعف من خلال التحديد على التنبيهات والأخطاء
        </Text>
      </Box>
    </Box>
  );
};

export default AboutApp;
