import { View, Dimensions, Alert } from "react-native";
import React, { useContext } from "react";
import { Box, Divider, Pressable, ScrollView, Text } from "native-base";
import { UserContext } from "../../components/providers";
import { Ionicons, AntDesign } from "@expo/vector-icons";
export const Settings = ({ navigation }) => {
  const { width } = Dimensions.get("window");
  const { state, logout } = useContext(UserContext);
  const textColor = "#ae8f74";
  return (
    <Box mt={5} alignItems="center" justifyContent="center">
      {state.userToken !== null && (
        <Box
          bg="#FFFCF7"
          w={width * 0.9}
          borderWidth={1}
          borderColor="gray.100"
          rounded="lg"
        >
          <Box flexDirection="row" alignItems="center" px={4} py={4}>
            <Text
              textAlign="right"
              fontFamily="montserrat-bold"
              color="gray.700"
              fontSize={13}
            >
              رقم المستخدم:
            </Text>
            <Text
              textAlign="right"
              fontFamily="montserrat-bold"
              ml={1}
              color="gray.700"
              fontSize={13}
            >
              {state.userID}
            </Text>
          </Box>
          <Divider my="1" bg="gray.100" />
          <Box flexDirection="row" alignItems="center" px={4} py={4}>
            <Text
              textAlign="right"
              fontFamily="montserrat-bold"
              color="gray.700"
              fontSize={13}
            >
              اسم المستخدم:
            </Text>
            <Text
              textAlign="right"
              fontFamily="montserrat-bold"
              ml={1}
              color="gray.700"
              fontSize={13}
            >
              {state.username}
            </Text>
          </Box>
        </Box>
      )}

      <Pressable
        mt={5}
        bg="#FFFCF7"
        w={width * 0.9}
        borderWidth={1}
        borderColor="gray.100"
        rounded="lg"
        onPress={() => {
          navigation.navigate("AboutApp");
        }}
      >
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent={"space-between"}
          px={4}
          py={4}
        >
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent={"space-between"}
          >
            <Box bg="tertiary.100" p={2} rounded="md">
              <AntDesign name="exclamationcircleo" size={20} color="#10b981" />
            </Box>
            <Text
              textAlign="right"
              fontFamily="montserrat-bold"
              ml={4}
              color="gray.700"
              fontSize={13}
            >
              عن التطبيق
            </Text>
          </Box>
          <Ionicons
            name="ios-chevron-back-outline"
            size={18}
            color={"#059669"}
          />
        </Box>
      </Pressable>
      {state.userToken !== null && (
        <Pressable
          mt={5}
          bg="#FFFCF7"
          w={width * 0.9}
          borderWidth={1}
          py={5}
          borderColor="gray.100"
          rounded="lg"
          onPress={() => {
            Alert.alert(
              "هل أنت متاكد من تسجيل الخروج ؟",
              "",

              [
                {
                  text: "الغاء",
                },
                {
                  text: "تسجيل الخروج",
                  onPress: () => {
                    logout();
                    navigation.goBack();
                  },
                  style: "destructive",
                },
              ]
            );
          }}
        >
          <Text
            textAlign="center"
            fontFamily="montserrat-bold"
            color="danger.500"
            fontSize={13}
          >
            تسجيل الخروج
          </Text>
        </Pressable>
      )}
    </Box>
  );
};
