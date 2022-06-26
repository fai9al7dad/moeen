import {
  View,
  ImageBackground,
  Dimensions,
  FlatList,
  StatusBar,
} from "react-native";
import React, { useRef } from "react";
import step1 from "../../assets/img/onboarding/step1.png";
import step2 from "../../assets/img/onboarding/step2.png";
import step3 from "../../assets/img/onboarding/step3.png";
import step4 from "../../assets/img/onboarding/step4.png";
import { Box, Pressable, Text } from "native-base";
import * as SecureStore from "expo-secure-store";

import { mistakesColor } from "../../assets/conts/mistakes";
import store from "../../stores/Store";
const Intro = ({ navigation }) => {
  const { height, width } = Dimensions.get("window");
  const listRef = useRef(null);
  const data = [
    {
      title: "التنبيهات :",
      body: "يمكنك وضع تنبيه بالضغط على الكلمة مرة واحدة فقط",
      img: step1,
    },
    {
      title: "الأخطاء :",
      body: "يمكنك وضع خطأ بالضغط على الكلمة مرتين أو بالضغط على كلمة بها تنبيه",
      img: step2,
    },
    {
      title: "المتابعة بالصفحة :",
      body: "يمكنك رؤية مجمل الأخطاء و التنبيهات في الصفحة عن طريق النظر الى الشريط العلوي",
      img: step3,
    },
    {
      title: "المتابعة بالسور :",
      body: "ويمكنك أيضا المتابعة عن طريق رؤية مجمل الأخطاء و التنبيهات لكل سورة",
      img: step4,
    },
  ];
  const renderItem = ({ item, index }) => {
    let arrBody = item.body.split(" ");

    return (
      <Box flex={1} h={height} w={width}>
        <ImageBackground
          source={item.img}
          resizeMode="stretch"
          style={{ flex: 1, justifyContent: "flex-end" }}
        >
          <Box h={height * 0.35} alignItems="flex-start" px={4}>
            <Text fontFamily="montserrat-bold" fontSize={"2xl"} color="white">
              {item.title}
            </Text>
            <Text
              mt={2}
              fontFamily="montserrat"
              fontSize={"md"}
              color="white"
              letterSpacing={"lg"}
              textAlign={"left"}
            >
              {arrBody.map((item, index) => {
                if (item === "تنبيه" || item === "التنبيهات") {
                  return (
                    <Text key={index} color={mistakesColor.warning}>
                      {item + " "}
                    </Text>
                  );
                }
                if (item === "خطأ" || item === "الأخطاء") {
                  return (
                    <Text key={index} color={mistakesColor.mistake}>
                      {item + " "}
                    </Text>
                  );
                }
                return <Text key={index}>{item + " "}</Text>;
              })}
            </Text>
            {index !== data.length - 1 ? (
              <Pressable
                bg="tertiary.400"
                borderWidth={1}
                borderColor="tertiary.500"
                rounded="lg"
                py={3}
                w="100%"
                mt={5}
                onPress={() =>
                  listRef.current.scrollToIndex({
                    animated: true,
                    index: (index + 1 - 3) * -1,
                    viewPosition: 1,
                  })
                }
              >
                <Text
                  textAlign="center"
                  fontFamily="montserrat-bold"
                  color="white"
                  fontSize={"lg"}
                >
                  التالي
                </Text>
              </Pressable>
            ) : (
              <Pressable
                bg="tertiary.400"
                borderWidth={1}
                borderColor="tertiary.500"
                rounded="lg"
                py={3}
                w="100%"
                mt={5}
                onPress={() => {
                  SecureStore.setItemAsync("finishedOnBoarding", "true");
                  store.updateOnBoarding({ status: "seen" });
                }}
              >
                <Text
                  textAlign="center"
                  fontFamily="montserrat-bold"
                  color="white"
                  fontSize={"lg"}
                >
                  انهاء
                </Text>
              </Pressable>
            )}
          </Box>
        </ImageBackground>
      </Box>
    );
  };
  const renderSeperator = () => {
    return <Box h={height} w={width * 0.2} bg="black" />;
  };
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle={"light-content"} />
      <FlatList
        ref={listRef}
        data={data}
        renderItem={renderItem}
        horizontal
        snapToInterval={width + width * 0.2}
        decelerationRate={0}
        disableIntervalMomentum
        bounces={false}
        ItemSeparatorComponent={renderSeperator}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Intro;
