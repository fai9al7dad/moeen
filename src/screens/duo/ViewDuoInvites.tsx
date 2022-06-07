import React, { useState } from "react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Box, Center, Pressable, Spinner, Text } from "native-base";
import { Dimensions, FlatList } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import EmptyList from "../../components/svg/EmptyList";
import { errorInterface } from "../auth/Register";
import ToastAlert from "../../components/general/ToastAlert";

const ViewDuoInvites = ({ jumpTo }) => {
  const navigation: any = useNavigation();
  const { width } = Dimensions.get("window");
  const { isLoading, isError, data, error }: any = useQuery(
    "duoInvites",
    fetchDuoInvites,
    { retry: 0 }
  );

  const [toast, setToast] = useState<errorInterface | null>(null);
  const queryClient = useQueryClient();
  const acceptOrRejectInviteMutation = useMutation(async (data: any) => {
    try {
      let res = await axios.post(`/api/duo/${data.type}-invite`, {
        corrector: data.id.toString(),
        isQuickAdd: false,
      });
      queryClient.refetchQueries(["asReciter"]);

      setToast({
        body:
          data.type === "accept"
            ? "تم قبول الإضافة الآن يمكنك التسميع عنده"
            : "تم رفض الإضافة",
        header: data.type === "accept" ? "تم القبول 👍✅" : "تم الرفض 👍❌",
        show: true,
        type: "success",
      });
      return res.data;
    } catch (e: any) {
      console.log("e", e.response.data);
      // setToast({
      //   body: e.response.data,
      //   header: "حصل خطأ 😔",
      //   show: true,
      //   type: "error",
      // });
    } finally {
      queryClient.refetchQueries(["duoInvites"]);

      setTimeout(() => {
        setToast({
          body: "",
          header: "",
          show: false,
          type: "success",
        });
      }, 3500);
    }
  });
  if (isLoading) {
    return (
      <Center w="100%" height="100%">
        <Spinner />
      </Center>
    );
  }

  if (isError) {
    return (
      <Box height={"100%"} justifyContent={"center"} alignItems="center">
        <EmptyList />
        <Box px={5}>
          <Text
            textAlign={"center"}
            fontFamily="montserrat-bold"
            color="gray.800"
            fontSize={"2xl"}
            mt={5}
          >
            {error.message}
          </Text>
          <Text
            textAlign={"center"}
            fontFamily="montserrat"
            color="gray.500"
            fontSize={"md"}
            mt={5}
          >
            ستتحدث القائمة مباشرة اذا تم إرسال طلبات إضافة كمسمع إليك
          </Text>
        </Box>
      </Box>
    );
  }
  const renderItem = ({ item, index }) => {
    const textColor = "#ae8f74";

    return (
      <Box
        key={item.corrector.id}
        height={item_height}
        px={5}
        pt={2}
        justifyContent="space-between"
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
              {item.corrector.username}
            </Text>
            <Text
              fontFamily={"montserrat"}
              fontSize={"10"}
              color={"gray.400"}
              textAlign="left"
            >
              رقم المعرف: {item.corrector.id}
            </Text>
          </Box>
        </Box>
        <Box
          w="100%"
          flexDirection="row"
          justifyContent={"space-between"}
          mb={2}
        >
          <Pressable
            bg="tertiary.600"
            rounded="md"
            width={"48%"}
            py={3}
            justifyContent="center"
            alignItems={"center"}
            onPress={() =>
              acceptOrRejectInviteMutation.mutate({
                id: item.corrector.id,
                type: "accept",
              })
            }
          >
            <Text color="white" fontFamily={"montserrat-bold"} fontSize="xs">
              قبول
            </Text>
          </Pressable>
          <Pressable
            bg="gray.200"
            rounded="md"
            width={"48%"}
            justifyContent="center"
            alignItems={"center"}
            onPress={() =>
              acceptOrRejectInviteMutation.mutate({
                id: item.corrector.id,
                type: "reject",
              })
            }
          >
            <Text color="gray.500" fontFamily={"montserrat-bold"} fontSize="xs">
              رفض
            </Text>
          </Pressable>
        </Box>
      </Box>
    );
  };
  return (
    <Box flex={1} alignItems="center" mt={5} position="relative">
      {toast?.show ? (
        <ToastAlert
          type={toast.type}
          header={toast?.header}
          message={toast?.body}
        />
      ) : null}
      <FlatList
        keyExtractor={(item) => item.corrector.id.toString()}
        data={data}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        ItemSeparatorComponent={renderSeperator}
        contentContainerStyle={{
          backgroundColor: "#FFFCF7",
          width: width * 0.9,
          borderRadius: 10,
        }}
      />
    </Box>
  );
};

export default ViewDuoInvites;
const renderSeperator = () => {
  return <Box borderWidth={0.5} borderColor="gray.200" />;
};

let item_height = 120;
const getItemLayout = (data, index) => {
  return {
    length: item_height,
    offset: item_height * index,
    index,
  };
};

const fetchDuoInvites = async () => {
  try {
    let res = await axios.get("/api/duo/view-invites");

    return res.data;
  } catch (e: any) {
    if (e.response.status === 404) {
      throw new Error("لا يوجد لديك طلبات إضافة حاليا");
    }
  }
};
