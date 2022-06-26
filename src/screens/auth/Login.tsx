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
import ActionButton from "../../components/general/ActionButton";
import { CustomInput } from "../../components/general/CustomInput";
import ToastAlert from "../../components/general/ToastAlert";
import { UserContext } from "../../components/providers";
interface errorInterface {
  header: string;
  body: string;
  show: boolean;
  type: "error" | "success";
}

const Login = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");
  const [toast, setToast] = useState<errorInterface | null>(null);
  const { login } = useContext(UserContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post("api/auth/login", data)
      .then((res) => {
        login(res.data);
        navigation.goBack();
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
// <Pressable onPress={onOpen}>
//   <Text
//     fontSize={"sm"}
//     textAlign="left"
//     fontFamily={"montserrat"}
//     color="gray.800"
//   >
//     <Text color="#149eca">أو الإستمرار من غير حساب</Text>
//   </Text>
// </Pressable>;
//  <Actionsheet isOpen={isOpen} onClose={onClose}>
//    <Actionsheet.Content>
//      <Box
//        w="100%"
//        h={height * 0.5}
//        px={4}
//        py={5}
//        justifyContent="space-between"
//      >
//        <Box>
//          <Text
//            fontSize="3xl"
//            color="info.500"
//            fontFamily={"montserrat-bold"}
//            textAlign="left"
//            mb={5}
//          >
//            هل أنت متأكد ؟
//          </Text>
//          <Text
//            fontSize="md"
//            color="blueGray.400"
//            fontFamily={"montserrat"}
//            textAlign="left"
//            mb={5}
//          >
//            اذا استخدمت التطبيق دون أن تسجل حساب، لن يمكنك استخدام جميع مميزات
//            التطبيق مثل
//          </Text>
//          <Text
//            fontSize={"sm"}
//            fontFamily={"montserrat"}
//            color="blueGray.400"
//            textAlign="left"
//          >
//            <Text color="blueGray.700">{"\u2B24"}</Text> حفظ اورادك ومزامنتها على
//            أكثر من جهاز
//          </Text>
//          <Text
//            fontSize={"sm"}
//            fontFamily={"montserrat"}
//            color="blueGray.400"
//            textAlign="left"
//            mt={4}
//          >
//            <Text color="blueGray.700">{"\u2B24"}</Text> استخدام التطبيق كطرف
//            مسمع أو كطرف مصحح
//          </Text>
//          <Text
//            fontSize={"sm"}
//            fontFamily={"montserrat"}
//            color="blueGray.400"
//            textAlign="left"
//            mt={4}
//          >
//            <Text color="blueGray.700">{"\u2B24"}</Text>حفظ أورادك في قاعدة
//            البيانات، بحيث يمكنك العودة اليها حتى لو حذفت التطبيق او غيرت جوالك
//          </Text>
//        </Box>
//        <Text
//          fontSize={"xs"}
//          fontFamily={"montserrat"}
//          color="blueGray.400"
//          textAlign="left"
//          mt={4}
//        >
//          ملاحظة: يمكنك التسجيل لاحقا، والإستفادة من جميع المميزات
//        </Text>
//        <Button
//          // onPress={handleSubmit(onSubmit)}
//          mt="5"
//          py="3"
//          shadow={"3"}
//          backgroundColor="info.500"
//          rounded={"lg"}
//        >
//          <Text color="white" fontFamily={"montserrat"}>
//            استمرار
//          </Text>
//        </Button>
//      </Box>
//    </Actionsheet.Content>
//  </Actionsheet>;
//  <Button
//    onPress={() =>
//      toast.show({
//        // placement: "top",
//        render: () => {
//          return (
//            <Box
//              bg="gray.800"
//              width={width * 0.95}
//              borderWidth={1}
//              borderColor="gray.700"
//              py="5"
//              rounded="md"
//              flexDirection={"row"}
//              alignItems="center"
//              justifyContent={"flex-start"}
//              px="4"
//              mb={5}
//            >
//              <Box
//                width={10}
//                height={10}
//                rounded="full"
//                justifyContent={"flex-start"}
//                alignItems="flex-start"
//                mr="2"
//              >
//                <MaterialCommunityIcons
//                  name="alert-rhombus-outline"
//                  size={27}
//                  color="#ef4444"
//                />
//              </Box>
//              <Box>
//                <Text color="white" fontFamily={"montserrat"} textAlign="left">
//                  حصل خطأ
//                </Text>
//                <Text
//                  color="gray.400"
//                  fontFamily={"montserrat"}
//                  textAlign="left"
//                >
//                  الرجاء تعبئة خانة البريد الإلكتروني
//                </Text>
//              </Box>
//            </Box>
//          );
//        },
//      })
//    }
//  >
//    Show Toast
//  </Button>;
