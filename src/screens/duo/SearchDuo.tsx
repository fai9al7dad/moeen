import React, { useCallback, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import {
  Box,
  Button,
  Center,
  FlatList,
  FormControl,
  Input,
  Pressable,
  Text,
} from "native-base";
import { Controller, useForm } from "react-hook-form";
import { Alert, Keyboard } from "react-native";
import { Dimensions } from "react-native";
import { CustomInput } from "../../components/general/CustomInput";
import { errorInterface } from "../auth/Register";
import ToastAlert from "../../components/general/ToastAlert";

const SearchDuo = () => {
  const { isLoading, isError, isIdle, error, isSuccess, data, mutate } =
    useMutation(async (query: any) => {
      let res = await axios.post("/api/users/search", query);
      return res.data;
    });
  const [toast, setToast] = useState<errorInterface | null>(null);
  const { width, height } = Dimensions.get("window");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    let query = data?.query;
    mutate({ query });
  };
  const sendInvite = async (userID: number) => {
    try {
      let res = await axios.post("/api/duo/accept-invite", {
        corrector: userID.toString(),
      });
      setToast({
        body: "تم ارسال طلب الإضافة بنجاح",
        header: "تم الإرسال 👍",
        show: true,
        type: "success",
      });

      return res.data;
    } catch (e: any) {
      console.log(e.response.data);

      setToast({
        body: "لقد أرسلت دعوة مسبقا اليه",
        header: "حصل خطأ 😔",
        show: true,
        type: "error",
      });
    } finally {
      setTimeout(() => {
        setToast({
          body: "",
          header: "",
          show: false,
          type: "success",
        });
      }, 3500);
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <Pressable
        key={item.id}
        height={item_height}
        flexDirection="row"
        alignItems="center"
        justifyContent={"space-between"}
        px={5}
        onPress={() => {
          sendInvite(item.id);
        }}
      >
        <Box flexDirection="row" alignItems="center">
          <Center
            w={7}
            h={7}
            rounded="md"
            bg={"tertiary.50"}
            borderWidth={0.5}
            borderColor="tertiary.200"
            mr={5}
          >
            <Text fontSize={"sm"} color="tertiary.700">
              {index + 1}
            </Text>
          </Center>
          <Box>
            <Text
              fontFamily={"montserrat"}
              fontSize={"lg"}
              color={"gray.800"}
              textAlign="left"
            >
              {item.username}
            </Text>
            <Text
              fontFamily={"montserrat"}
              fontSize={"10"}
              color={"gray.400"}
              textAlign="left"
            >
              رقم المعرف: {item.id}
            </Text>
          </Box>
        </Box>
        <Box>
          {/* <Ionicons name="ios-chevron-back-outline" size={18} color={"#059669"} /> */}
        </Box>
      </Pressable>
    );
  };

  return (
    <Pressable flex={1} onPress={Keyboard.dismiss} px={5}>
      {toast?.show ? (
        <ToastAlert
          type={toast.type}
          header={toast?.header}
          message={toast?.body}
        />
      ) : null}
      <Box
        flexDirection="row"
        alignItems={"center"}
        justifyContent="space-between"
      >
        <CustomInput
          name="query"
          label="ابحث.."
          control={control}
          formControlStyle={{ width: "80%" }}
        />
        <Button
          onPress={handleSubmit(onSubmit)}
          width={"20%"}
          height="100%"
          roundedLeft={0}
          bg="tertiary.600"
        >
          <Text color="white" fontFamily={"montserrat"}>
            إبحث
          </Text>
        </Button>
      </Box>
      <Text
        textAlign={"left"}
        fontSize="xs"
        fontFamily={"montserrat"}
        color="gray.400"
        mt={1}
      >
        يمكن البحث بواسطة اسم المستخدم، أو رقم المعرف
      </Text>
      {isError ? (
        <Box>
          <Text mt={5} textAlign="left" fontFamily={"montserrat"}>
            حصل خطأ {error.message}
          </Text>
        </Box>
      ) : null}
      {isLoading ? (
        <Box>
          <Text mt={5} textAlign="left" fontFamily={"montserrat"}>
            جار البحث
          </Text>
        </Box>
      ) : null}

      {isSuccess && data?.result?.length > 1 ? (
        <FlatList
          keyExtractor={(item, index) => item.id.toString()}
          data={data.result}
          renderItem={renderItem}
          getItemLayout={getItemLayout}
          ItemSeparatorComponent={renderSeperator}
          contentContainerStyle={{
            backgroundColor: "#FFFCF7",
            marginTop: 20,
            width: width * 0.9,
            borderRadius: 10,
          }}
        />
      ) : null}
      {data?.result?.length < 1 ? (
        <Text mt={5} textAlign="left" fontFamily={"montserrat"}>
          لا يوجد نتائج تطابق بحثك
        </Text>
      ) : null}
    </Pressable>
  );
};

export default SearchDuo;

const renderSeperator = () => {
  return <Box borderWidth={0.5} borderColor="gray.200" />;
};

let item_height = 70;
const getItemLayout = (data, index) => {
  return {
    length: item_height,
    offset: item_height * index,
    index,
  };
};
