import { Box, Center, Text } from "native-base";
import React from "react";
import { mistakesColor } from "../../assets/conts/mistakes";
import ActionButton from "../../components/general/ActionButton";
import store from "../../stores/Store";
import quran from "../../stores/Quran";

const FinishWerd = ({ navigation }) => {
  const endWerd = async () => {
    // call finish werd from store
    // init quran from quran store
    // go back after finish
    store.finishWerd();
    navigation.navigate("Quran");
  };
  return (
    <Box h={"100%"} px={4} justifyContent="space-between">
      <Box mt={5}>
        <Text fontSize={"2xl"} fontFamily="montserrat-bold" textAlign={"left"}>
          إنهاء وردك مع {store.username} ؟
        </Text>
        <Box
          flexDirection={"row"}
          alignItems="center"
          justifyContent={"flex-start"}
          my={5}
        >
          <Box
            backgroundColor={mistakesColor.mistake}
            width="5"
            height="5"
            rounded="full"
            mr={4}
          />
          <Text
            fontSize={"md"}
            fontFamily="montserrat-bold"
            textAlign={"center"}
          >
            عدد الأخطاء {store.mistakesCounter}{" "}
          </Text>
        </Box>
        <Box
          flexDirection={"row"}
          alignItems="center"
          justifyContent={"flex-start"}
        >
          <Box
            backgroundColor={mistakesColor.warning}
            width="5"
            height="5"
            rounded="full"
            mr={4}
          />
          <Text
            fontSize={"md"}
            fontFamily="montserrat-bold"
            textAlign={"center"}
          >
            عدد التنبيهات {store.warningsCounter}
          </Text>
        </Box>
      </Box>

      <ActionButton
        text="إنهاء"
        style={{ width: "100%", marginBottom: 50 }}
        onPress={endWerd}
      />
    </Box>
  );
};

export default FinishWerd;
