import React from "react";
import { Box, ScrollView, Text } from "native-base";
import { useForm } from "react-hook-form";
import { CustomInput } from "../../components/general/CustomInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ActionButton from "../../components/general/ActionButton";
import { Dimensions } from "react-native";
import axios from "axios";
import { useQueryClient } from "react-query";
import { inject, observer } from "mobx-react";
import store from "../../stores/Store";

const StartOrFinishWerdMeta = ({ route, navigation }) => {
  const { isStart, werdID, duoID, username } = route.params;
  const { height } = Dimensions.get("window");
  let defaultObj = {
    startSurah: "",
    endSurah: "",
    startVerseNumber: 0,
    endVerseNumber: 0,
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultObj,
  });
  const queryClient = useQueryClient();
  const onSubmit = async (formData) => {
    let payload = {
      isStart: isStart,
      werdID: werdID,
      endSurah: formData?.endSurah,
      startSurah: formData.startSurah,
      endVerseNumber:
        formData.endVerseNumber > 0
          ? formData?.endVerseNumber?.toString()
          : null,
      startVerseNumber:
        formData.startVerseNumber > 0
          ? formData?.startVerseNumber?.toString()
          : null,
    };

    try {
      let res = await axios.post("/api/werd/add-werd-meta", payload);
      if (isStart) {
        store.startWerd(werdID, duoID, username);
      }
      if (!isStart) {
        store.finishWerd();
      }

      queryClient.refetchQueries("viewWirds");
      let title = `${payload.startSurah ? payload.startSurah : ""} ${
        payload.startVerseNumber ? payload.startVerseNumber : ""
      } ${payload.endSurah ? "- " + payload.endSurah : ""} ${
        payload.endVerseNumber ? payload.endVerseNumber : ""
      }`;
      navigation.navigate("Quran");
    } catch (e: any) {
      console.log(e.response.data);
    }
  };
  return (
    <KeyboardAwareScrollView keyboardDismissMode="on-drag">
      <Box
        mt={5}
        px={5}
        height={height * 0.8}
        alignItems={"center"}
        justifyContent="space-between"
      >
        <Box w="100%">
          <Text fontSize={"xs"} textAlign="left" fontFamily={"montserrat"}>
            ???????? ?????????????? ????????????????
          </Text>
          {isStart ? (
            <>
              <CustomInput
                topLabel="???? ????????"
                name="startSurah"
                control={control}
                formControlStyle={{ marginTop: 10 }}
                isRequired={false}
              />
              <CustomInput
                topLabel="?????? ??????"
                name="startVerseNumber"
                control={control}
                formControlStyle={{ marginTop: 10 }}
                isRequired={false}
              />
            </>
          ) : (
            <>
              <CustomInput
                topLabel="?????? ????????"
                name="endSurah"
                control={control}
                formControlStyle={{ marginTop: 10 }}
                isRequired={false}
              />
              <CustomInput
                topLabel="?????? ??????"
                name="endVerseNumber"
                control={control}
                formControlStyle={{ marginTop: 10 }}
                isRequired={false}
              />
            </>
          )}
        </Box>
        <Box flexDirection={"row"} w="100%" justifyContent="space-between">
          <ActionButton
            text="??????"
            style={{ width: "48%" }}
            onPress={handleSubmit(onSubmit)}
          />
          <ActionButton
            onPress={() => {
              if (isStart) {
                store.startWerd(werdID, duoID, username);
              }
              if (!isStart) {
                store.finishWerd();
              }
              navigation.navigate("Quran");
            }}
            text="????????"
            style={{
              width: "48%",
              backgroundColor: "#e4e4e7",
              borderBottomColor: "#a1a1aa",
            }}
            textStyle={{ color: "#71717a" }}
          />
        </Box>
      </Box>
    </KeyboardAwareScrollView>
  );
};

export default StartOrFinishWerdMeta;
