import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Box, Center, Heading, ScrollView, Text, VStack } from "native-base";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Dimensions, KeyboardAvoidingView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ActionButton from "../../components/general/ActionButton";
import { CustomInput } from "../../components/general/CustomInput";
import ToastAlert from "../../components/general/ToastAlert";
interface errorInterface {
  header: string;
  body: string;
  show: boolean;
  type: "error" | "success";
}
const ForgotPassword = () => {
  const { width } = Dimensions.get("window");
  const [toast, setToast] = useState<errorInterface | null>(null);
  const [step, setStep] = useState(1);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <KeyboardAwareScrollView>
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
            نسيت كلمة المرور ؟ 😔
          </Heading>
          <Heading
            mt="2"
            color="tertiary.800"
            textAlign={"left"}
            fontFamily={"montserrat"}
            size="xs"
          >
            لا بأس، أدخل بريدك الإلكتروني الذي سجلت به وستصلك رسالة منا
          </Heading>
        </Box>
        <Box
          safeArea
          w={width * 0.95}
          //   shadow={"2"}
        >
          <VStack space={3}>
            {step === 1 && (
              <Step1
                errors={errors}
                control={control}
                handleSubmit={handleSubmit}
                setToast={(val) => {
                  setToast(val);
                }}
                setStep={(val) => {
                  setStep(val);
                }}
              />
            )}
            {step === 2 && (
              <Step2
                errors={errors}
                control={control}
                handleSubmit={handleSubmit}
                setToast={(val) => {
                  setToast(val);
                }}
              />
            )}
          </VStack>
        </Box>
      </Center>
    </KeyboardAwareScrollView>
  );
};

export default ForgotPassword;

const Step1 = ({ errors, control, handleSubmit, setToast, setStep }) => {
  const sendToken = (data) => {
    axios
      .post("api/auth/create-forgot-password-token", data)
      .then((res) => {
        setToast({
          body: "الرجاء التحقق من بريدك الإلكتروني",
          header: "تم الإرسال 📥",
          show: true,
          type: "success",
        });
        setTimeout(() => {
          setToast({ body: "", header: "", show: false, type: "error" });
        }, 3300);
        setStep(2);
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
    <Box>
      <CustomInput
        name={"userEmail"}
        label={"البريد الإلكتروني"}
        control={control}
      />
      {errors.userEmail && (
        <Text
          color="red.400"
          textAlign={"left"}
          fontFamily="montserrat"
          fontSize={"xs"}
        >
          البريد الإلكتروني مطلوب
        </Text>
      )}

      <ActionButton text="أرسل" onPress={handleSubmit(sendToken)} />
    </Box>
  );
};
const Step2 = ({ errors, control, handleSubmit, setToast }) => {
  const navigation: any = useNavigation();
  const changePassword = (data) => {
    axios
      .post("api/auth/verify-forgot-password-token", data)
      .then((res) => {
        setToast({
          body: "الآن يمكن تسجيل الدخول برقمك السري الجديد",
          header: "تم التغير بنجاح 🥳",
          show: true,
          type: "success",
        });
        setTimeout(() => {
          setToast({ body: "", header: "", show: false, type: "error" });
          navigation.navigate("Login");
        }, 3300);
        // setStep(2);
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
    <Box>
      <CustomInput
        label={"الرمز"}
        control={control}
        name={"token"}
        rules={{
          required: {
            value: true,
            message: "الرمز مطلوب",
          },
          minLength: {
            value: 4,
            message: "الرمز لا بد ان لا يقل عن 4 خانات",
          },
          maxLength: {
            value: 4,
            message: "الرمز لا بد ان لا يزيد عن 4 خانات",
          },
        }}
      />
      {errors.token && (
        <Text
          color="red.400"
          textAlign={"left"}
          fontFamily="montserrat"
          fontSize={"xs"}
        >
          {errors.token.message}
        </Text>
      )}
      <Box my={2}>
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
      </Box>

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

      <ActionButton text="غير" onPress={handleSubmit(changePassword)} />
    </Box>
  );
};
