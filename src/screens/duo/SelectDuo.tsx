import React, { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../../components/providers";
import { Dimensions } from "react-native";
import NotAuthAlert from "../../components/general/NotAuthAlert";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

import { Box, Text } from "native-base";
import ViewDuoInvites from "./ViewDuoInvites";
import NetInfo from "@react-native-community/netinfo";
import AllDuos from "../../components/selectDuo/allDuos";
import tempColorsModel from "../../utils/sqlite/model/tempColorsModel";
import { tempColorsDto } from "../../utils/sqlite/model/tempColorsModel.dto";
import axios from "axios";
import { mistakesColor } from "../../assets/conts/mistakes";

export const SelectDuo = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");
  const [index, setIndex] = React.useState(0);
  const [isOnline, setIsOnline] = React.useState<any>(true);
  const [routes] = React.useState([
    { key: "duos", title: "الثنائيات" },
    { key: "invites", title: "طلبات الإضافة" },
  ]);
  const { state } = useContext(UserContext);
  useEffect(() => {
    NetInfo.fetch().then((state) => {
      setIsOnline(state.isConnected);
    });
  }, []);
  if (!isOnline) {
    return (
      <Box
        height={height * 0.9}
        justifyContent="center"
        alignItems={"center"}
        px={5}
      >
        <Text
          fontFamily={"montserrat-bold"}
          fontSize={"2xl"}
          textAlign={"center"}
        >
          لا يوجد إتصال بالإنترنت
        </Text>
        <Text
          fontFamily={"montserrat"}
          fontSize={"sm"}
          mt={5}
          color="gray.500"
          textAlign={"center"}
        >
          تحتاج إتصال بالإنترنت لإستخدام ميزة الثنائيات
        </Text>
      </Box>
    );
  }
  const renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case "duos":
        return <AllDuos />;
      case "invites":
        return <ViewDuoInvites jumpTo={jumpTo} />;
    }
  };

  if (!state.userToken) {
    return <NotAuthAlert />;
  }

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "#065f46" }}
      style={{ backgroundColor: "#fff8ed" }}
      activeColor="#065f46"
      inactiveColor="#10b981"
    />
  );
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
      initialLayout={{ width: width, height: height }}
    />
  );
};

{
  /* {data?.map((item) => {
        return <Text key={item.reciterID}>{item.corrector.username}</Text>;
      })} */
}
// </Box>
