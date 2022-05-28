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

const WerdMeta = ({ store, route, navigation }) => {
  const {
    startSurah,
    endSurah,
    startVerseNumber,
    endVerseNumber,
    newTitle,
    newStartSurah,
    newEndSurah,
    newStartVerseNumber,
    newEndVerseNumber,
  } = route.params;
  const { currentWerdID: werdID } = store;
  const { height } = Dimensions.get("window");
  let defaultObj = {
    startSurah: "",
    endSurah: "",
    startVerseNumber: 0,
    endVerseNumber: 0,
  };
  if (route.params) {
    defaultObj = {
      startSurah: startSurah ? startSurah : newStartSurah,
      endSurah: endSurah ? endSurah : newEndSurah,
      startVerseNumber: startVerseNumber
        ? startVerseNumber?.toString()
        : newStartVerseNumber?.toString(),
      endVerseNumber: endVerseNumber
        ? endVerseNumber?.toString()
        : newEndVerseNumber?.toString(),
    };
  }
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
      navigation.goBack();
      queryClient.refetchQueries("viewWirds");
      let title = `${payload.startSurah ? payload.startSurah : ""} ${
        payload.startVerseNumber ? payload.startVerseNumber : ""
      } ${payload.endSurah ? "- " + payload.endSurah : ""} ${
        payload.endVerseNumber ? payload.endVerseNumber : ""
      }`;
      navigation.navigate("ViewWerdsHighlights", {
        newTitle: title,
        newStartSurah: payload.startSurah,
        newEndSurah: payload.endSurah,
        newStartVerseNumber: payload.startVerseNumber,
        newEndVerseNumber: payload.endVerseNumber,
      });
    } catch (e: any) {
      console.log(e.response.data);
    }
  };
  return (
    <KeyboardAwareScrollView keyboardDismissMode="on-drag">
      <Box
        px={5}
        height={height * 0.8}
        alignItems={"center"}
        justifyContent="space-between"
      >
        <Box w="100%">
          <Text fontSize={"xs"} textAlign="left" fontFamily={"montserrat"}>
            جميع الخانات اختيارية
          </Text>

          <CustomInput
            topLabel="من سورة"
            name="startSurah"
            control={control}
            formControlStyle={{ marginTop: 10 }}
            isRequired={false}
          />
          <CustomInput
            topLabel="آية رقم"
            name="startVerseNumber"
            control={control}
            formControlStyle={{ marginTop: 10 }}
            isRequired={false}
          />
          <CustomInput
            topLabel="الى سورة"
            name="endSurah"
            control={control}
            formControlStyle={{ marginTop: 10 }}
            isRequired={false}
          />
          <CustomInput
            topLabel="آية رقم"
            name="endVerseNumber"
            control={control}
            formControlStyle={{ marginTop: 10 }}
            isRequired={false}
          />
        </Box>
        <Box flexDirection={"row"} w="100%" justifyContent="space-between">
          <ActionButton
            text="تعديل"
            style={{ width: "48%" }}
            onPress={handleSubmit(onSubmit)}
          />
          <ActionButton
            onPress={() => navigation.goBack()}
            text="الغاء"
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

export default inject("store")(observer(WerdMeta));
