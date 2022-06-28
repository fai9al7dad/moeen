import axios from "axios";
import {
  Actionsheet,
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  Pressable,
  ScrollView,
  Text,
  TextField,
  useDisclose,
  useToast,
  VStack,
} from "native-base";
import React, { useState } from "react";
import { useContext } from "react";
import { Controller, useController, useForm } from "react-hook-form";
import { Dimensions } from "react-native";
import { mistakesColor } from "../../assets/conts/mistakes";
import ActionButton from "../../components/general/ActionButton";
import { CustomInput } from "../../components/general/CustomInput";
import ToastAlert from "../../components/general/ToastAlert";
import SyncModal from "../../components/page/components/auth/SyncModal";
import { UserContext } from "../../components/providers";
import tempColorsModel from "../../utils/sqlite/model/tempColorsModel";
interface errorInterface {
  header: string;
  body: string;
  show: boolean;
  type: "error" | "success";
}

const Login = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");
  const [toast, setToast] = useState<errorInterface | null>(null);
  const [showSyncModal, setShowSyncModal] = useState(false);
  const { login } = useContext(UserContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const tempColors: any = await tempColorsModel.getAllWords();
    if (tempColors?.length > 0) {
      setShowSyncModal(true);
    }
    axios
      .post("api/auth/login", data)
      .then((res) => {
        login(res.data);
        if (tempColors.length < 1) {
          navigation.goBack();
        }
      })
      .catch((e) => {
        setToast({
          body: e.response.data.message,
          header: "حصل خطأ 😔",
          show: true,
          type: "error",
        });
        setTimeout(() => {
          setToast({ body: "", header: "", show: false, type: "error" });
        }, 3300);
      });
  };
  return (
    <ScrollView>
      <Center w={width} mt={10}>
        <SyncModal
          showSyncModal={showSyncModal}
          onClose={(val) => setShowSyncModal(val)}
        />
        {toast?.show ? (
          <ToastAlert
            type={toast.type}
            header={toast?.header}
            message={toast?.body}
          />
        ) : null}
        <Box w={width * 0.95} mb="3">
          <Heading
            size="3xl"
            shadow={"1"}
            textAlign={"left"}
            color="tertiary.500"
            fontFamily={"montserrat-bold"}
          >
            حياكم الله 👋
          </Heading>
          <Heading
            mt="2"
            color="tertiary.800"
            textAlign={"left"}
            fontFamily={"montserrat"}
            size="xs"
          >
            الرجاء تسجيل الدخول للإستمرار
          </Heading>
        </Box>
        <Box
          safeArea
          w={width * 0.95}
          //   shadow={"2"}
        >
          <VStack space={3}>
            <CustomInput
              name={"username"}
              label={"اسم المستخدم"}
              control={control}
            />
            {errors.username && (
              <Text
                color="red.400"
                textAlign={"left"}
                fontFamily="montserrat"
                fontSize={"xs"}
              >
                اسم المستخدم مطلوب
              </Text>
            )}
            <CustomInput
              name={"password"}
              label={"كلمة المرور"}
              control={control}
              type={"password"}
            />
            {errors.password && (
              <Text
                color="red.400"
                textAlign={"left"}
                fontFamily="montserrat"
                fontSize={"xs"}
              >
                كلمة المرور مطلوبه
              </Text>
            )}
            <Pressable onPress={() => navigation.navigate("ForgotPassword")}>
              <Text
                fontSize={"xs"}
                textAlign="left"
                fontFamily={"montserrat"}
                color="gray.800"
              >
                نسيت كلمة المرور؟{" "}
                <Text color="tertiary.500">اضغط هنا للإستعادة </Text>
              </Text>
            </Pressable>
            <ActionButton text="ادخل" onPress={handleSubmit(onSubmit)} />

            <Pressable onPress={() => navigation.navigate("Register")}>
              <Text
                fontSize={"sm"}
                textAlign="left"
                fontFamily={"montserrat"}
                color="gray.800"
              >
                ليس لديك حساب؟{" "}
                <Text color="tertiary.500">تسجيل حساب جديد </Text>
              </Text>
            </Pressable>
          </VStack>
        </Box>
      </Center>
    </ScrollView>
  );
};

export default Login;
