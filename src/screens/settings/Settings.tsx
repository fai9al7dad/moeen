import { View, Dimensions, Alert } from "react-native";
import React, { useContext, useState } from "react";
import {
  Box,
  Center,
  Divider,
  Pressable,
  ScrollView,
  Spinner,
  Text,
} from "native-base";
import { UserContext } from "../../components/providers";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import tempColorsModel from "../../utils/sqlite/model/tempColorsModel";
import axios from "axios";
import { getRowById } from "../../utils/sqlite/getRowById";
import colorsModel from "../../utils/sqlite/model/colorsModel";
import { getColorFromType } from "../../utils/sqlite/getColorFromType";

export const Settings = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");
  const { state, logout } = useContext(UserContext);
  const [loadingSync, setLoadingSync] = useState(false);
  const onSync = async () => {
    setLoadingSync(true);
    // adding from backend to sqlite
    await colorsModel.deleteAllColors();
    try {
      const res: any = await axios.get(
        `/api/highlight/user-id/${state.userID}`
      );
      const highlightsByUserID = res.data;
      highlightsByUserID.map(async (item) => {
        const word: any = await getRowById("word", item.wordID);
        const line = await getRowById("line", word.lineID); // to get word page number
        await colorsModel.insertColor({
          wordID: word.id,
          chapterCode: word.chapterCode,
          verseNumber: word.verseNumber,
          pageNumber: line.pageID,
          color: getColorFromType(item.type),
          sendRequest: false,
        });

        // todo: request to close app to see changes
      });
      setLoadingSync(false);
    } catch (e: any) {
      Alert.alert("حصل خطأ", e.response.data.message, [{ text: "عودة" }]);
    } finally {
      setLoadingSync(false);
    }
  };
  return (
    <ScrollView>
      {loadingSync === true && (
        <Box zIndex={"999"}>
          <Box
            width={width}
            height={height}
            bg="gray.50"
            position={"absolute"}
            opacity={0.6}
          />
          <Box top={300} right={0} left={0} position="absolute">
            <Spinner color="tertiary.500" />
          </Box>
        </Box>
      )}
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

            <Divider my="1" bg="gray.100" />
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
                <AntDesign
                  name="exclamationcircleo"
                  size={20}
                  color="#10b981"
                />
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

        <Pressable
          bg="#FFFCF7"
          mt={5}
          w={width * 0.9}
          borderWidth={1}
          borderColor="gray.100"
          roundedTop="lg"
          onPress={() => {
            Linking.openURL(
              `mailto:fai9al7dad@gmail.com?subject=بلاغ | معين&body=\n \n ------------- \n اسم المستخدم : ${state.username} \n  رقم المستخدم : ${state.userID}`
            );
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
                <Ionicons
                  name="ios-warning-outline"
                  size={20}
                  color="#10b981"
                />
              </Box>
              <Text
                textAlign="right"
                fontFamily="montserrat-bold"
                ml={4}
                color="gray.700"
                fontSize={13}
              >
                ارسال بلاغ
              </Text>
            </Box>
          </Box>
        </Pressable>
        <Pressable
          bg="#FFFCF7"
          w={width * 0.9}
          borderTopWidth={0}
          borderWidth={1}
          borderColor="gray.100"
          roundedBottom="lg"
          onPress={() => {
            Linking.openURL(
              `mailto:fai9al7dad@gmail.com?subject=اقتراح | معين&body=\n \n ------------- \n اسم المستخدم : ${state.username} \n  رقم المستخدم : ${state.userID}`
            );
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
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={20}
                  color="#10b981"
                />
              </Box>
              <Text
                textAlign="right"
                fontFamily="montserrat-bold"
                ml={4}
                color="gray.700"
                fontSize={13}
              >
                ارسال اقتراح
              </Text>
            </Box>
          </Box>
        </Pressable>

        {state.userToken !== null && (
          <>
            <Pressable
              bg="#FFFCF7"
              w={width * 0.9}
              borderTopWidth={0}
              borderWidth={1}
              borderColor="gray.100"
              roundedBottom="lg"
              onPress={() => {
                Alert.alert(
                  "هل أنت متاكد من المزامنة ؟",
                  "سيتم إستبدال الاخطاء والتنبيهات الموجودة في هذا الجهاز، بالأخطاء والتنبيهات المربوطة بالحساب",

                  [
                    {
                      text: "الغاء",
                    },
                    {
                      text: "مزامنة",
                      onPress: onSync,
                      style: "destructive",
                    },
                  ]
                );
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
                    <Ionicons name="sync-outline" size={20} color="#10b981" />
                  </Box>
                  <Text
                    textAlign="right"
                    fontFamily="montserrat-bold"
                    ml={4}
                    color="gray.700"
                    fontSize={13}
                  >
                    مزامنة البيانات على هذا الجهاز
                  </Text>
                </Box>
              </Box>
            </Pressable>

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
          </>
        )}
      </Box>
    </ScrollView>
  );
};
