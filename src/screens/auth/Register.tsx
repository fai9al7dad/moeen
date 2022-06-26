import {
  Box,
  Center,
  FormControl,
  Heading,
  Input,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import React, { useState } from "react";
import { Dimensions } from "react-native";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import ToastAlert from "../../components/general/ToastAlert";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useEffect } from "react";
import ActionButton from "../../components/general/ActionButton";

const CustomInput = ({ name, label, type = "text", control, rules }) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { value, onChange } }) => {
          return (
            <FormControl>
              {/* <FormControl.Label>
          <Text color="blueGray.500" fontFamily={"montserrat"}>
            {label}
          </Text>
        </FormControl.Label> */}
              <Input
                value={value}
                fontFamily={"montserrat"}
                onChangeText={onChange}
                py={5}
                autoCapitalize="none"
                placeholder={label}
                textAlign={"right"}
                fontSize="lg"
                backgroundColor="#FFFCF7"
                borderWidth={1}
                borderColor="gray.200"
                rounded={"lg"}
                type={type}
              />
            </FormControl>
          );
        }}
      />
    </>
  );
};
export interface errorInterface {
  header: string;
  body: string;
  show: boolean;
  type: "error" | "success";
}
const Register = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");
  const [toast, setToast] = useState<errorInterface | null>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",

      email: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data) => {
    axios
      .post("api/auth/register", data)
      .then((res) => {
        setToast({
          body: "تم تسجيل حسابك بنجاح يمكنك تسجيل الدخول الآن",
          header: "تم التسجيل 👍",
          show: true,
          type: "success",
        });
        setTimeout(() => {
          navigation.goBack();
        }, 1500);
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
    <KeyboardAwareScrollView>
      <Center w={width} mt={10}>
        <Box w={width * 0.95} mb="3">
          {toast?.show ? (
            <ToastAlert
              type={toast.type}
              header={toast?.header}
              message={toast?.body}
            />
          ) : null}
          <Heading
            size="2xl"
            shadow={"1"}
            textAlign={"left"}
            color="tertiary.500"
            fontFamily={"montserrat-bold"}
          >
            مستخدم جديد 🥳
          </Heading>
          <Heading
            mt="2"
            color="tertiary.800"
            textAlign={"left"}
            fontFamily={"montserrat"}
            size="xs"
          >
            الرجاء تسجيل حساب للإستمرار
          </Heading>
        </Box>
        <Box safeArea w={width * 0.95} rounded="lg">
          <VStack space={3}>
            <CustomInput
              name={"username"}
              label={"اسم المستخدم"}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "اسم المستخدم مطلوب",
                },
              }}
            />
            {errors.username && (
              <Text
                color="red.400"
                textAlign={"left"}
                fontFamily="montserrat"
                fontSize={"xs"}
              >
                {errors.username.message}
              </Text>
            )}
            <CustomInput
              name={"email"}
              label={"البريد الإلكتروني"}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "البريد الإلكتروني مطلوب",
                },
              }}
            />
            <Text
              textAlign={"left"}
              fontSize="xs"
              fontFamily="montserrat"
              color="gray.400"
            >
              تحتاج الإيميل في حال نسيت كلمة المرور
            </Text>
            {errors.email && (
              <Text
                color="red.400"
                textAlign={"left"}
                fontFamily="montserrat"
                fontSize={"xs"}
              >
                {errors.email.message}
              </Text>
            )}
            <CustomInput
              label={"كلمة المرور"}
              type="password"
              control={control}
              name={"password"}
              rules={{
                required: {
                  value: true,
                  message: "كلمة المرور مطلوبه",
                },
                minLength: {
                  value: 8,
                  message: "كلمة المرور لا بد ان لا تقل عن 8 خانات",
                },
              }}
            />
            {errors.password && (
              <Text
                color="red.400"
                textAlign={"left"}
                fontFamily="montserrat"
                fontSize={"xs"}
              >
                {errors.password.message}
              </Text>
            )}
            <CustomInput
              label={"تكرار كلمة المرور"}
              type="password"
              control={control}
              name={"confirmPassword"}
              rules={{
                required: {
                  value: true,
                  message: "كلمة المرور مطلوبه",
                },
                minLength: {
                  value: 8,
                  message: "كلمة المرور لا بد ان لا تقل عن 8 خانات",
                },
              }}
            />
            {errors.confirmPassword && (
              <Text
                color="red.400"
                textAlign={"left"}
                fontFamily="montserrat"
                fontSize={"xs"}
              >
                {errors.confirmPassword.message}
              </Text>
            )}
            <ActionButton text="سجل" onPress={handleSubmit(onSubmit)} />
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text
                fontSize={"sm"}
                textAlign="left"
                fontFamily={"montserrat"}
                color="#23272f"
              >
                لديك حساب؟ <Text color="tertiary.500">تسجيل الدخول </Text>
              </Text>
            </Pressable>
          </VStack>
        </Box>
      </Center>
    </KeyboardAwareScrollView>
  );
};

export default Register;
