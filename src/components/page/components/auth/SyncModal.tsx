import { Dimensions } from "react-native";
import React from "react";
import { Actionsheet, Box, Button, Text } from "native-base";
import tempColorsModel from "../../../../utils/sqlite/model/tempColorsModel";
import { mistakesColor } from "../../../../assets/conts/mistakes";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { getTypeFromColor } from "../../../../utils/getTypeFromColor";

const SyncModal = ({ showSyncModal, onClose }) => {
  const { width, height } = Dimensions.get("window");
  const navigation: any = useNavigation();
  const onSync = async () => {
    // adding from sqlite to backend
    const tempColors: any = await tempColorsModel.getAllWords();
    let requests: any = [];
    for (let i = 0; i < tempColors.length; i++) {
      requests[i] = axios.post("/api/highlight/add", {
        type: getTypeFromColor(tempColors[i].color),
        wordID: tempColors[i].wordID,
      });
    }
    Promise.all(requests).then(async (res) => {
      await tempColorsModel.deleteAllColors();
      navigation.goBack();
    });
  };
  return (
    <Actionsheet isOpen={showSyncModal} onClose={() => onClose(false)}>
      <Actionsheet.Content>
        <Box
          w="100%"
          h={height * 0.5}
          px={2}
          py={5}
          justifyContent="space-between"
        >
          <Box>
            <Text
              fontSize="2xl"
              color="tertiary.500"
              fontFamily={"montserrat-bold"}
              textAlign="left"
              mb={5}
            >
              لديك أخطاء وتنبيهات لم يتم مزامنتها
            </Text>
            <Text
              fontSize="md"
              color="blueGray.400"
              fontFamily={"montserrat"}
              textAlign="left"
              mb={5}
            >
              توجد أخطاء مسجله فقط في هذا الجهاز، وليست مربوطة بحسابك. وذلك يمكن
              أن يحصل لعدة أسباب منها:
            </Text>
            <Text
              fontSize={"sm"}
              fontFamily={"montserrat"}
              color="blueGray.400"
              textAlign="left"
            >
              <Text color="blueGray.700">{"\u2B24"}</Text> أضفت تنبيهات وأخطاء
              ولست مسجل الدخول
            </Text>
            <Text
              fontSize={"sm"}
              fontFamily={"montserrat"}
              color="blueGray.400"
              textAlign="left"
              mt={4}
            >
              <Text color="blueGray.700">{"\u2B24"}</Text> أضفت تنبيهات وأخطاء
              ولست متصل بالإنترنت
            </Text>
          </Box>
          <Text
            fontSize={"xs"}
            fontFamily={"montserrat"}
            color="blueGray.400"
            textAlign="left"
            mt={4}
          >
            ملاحظة: جميع الأخطاء والتنبيهات الجديدة، ستضاف إلى هذا الحساب
          </Text>
          <Box flexDirection="row" justifyContent={"space-between"}>
            <Button
              onPress={onSync}
              mt="5"
              py="5"
              shadow={"3"}
              backgroundColor="tertiary.500"
              rounded={"lg"}
              w={"49%"}
            >
              <Text color="white" fontFamily={"montserrat"}>
                مزامنة
              </Text>
            </Button>
            <Button
              onPress={() => onClose(false)}
              mt="5"
              py="5"
              backgroundColor="gray.200"
              rounded={"lg"}
              w={"49%"}
            >
              <Text color="gray.500" fontFamily={"montserrat"}>
                تجاهل
              </Text>
            </Button>
          </Box>
        </Box>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default SyncModal;
