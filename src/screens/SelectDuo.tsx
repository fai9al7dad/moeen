import React from "react";
import { useContext } from "react";
import { UserContext } from "../components/providers";
import { useState } from "react";
import Warning from "../components/svg/Warning";
import { Box, Button, Center, Spinner, Text } from "native-base";
import { Pressable, useWindowDimensions } from "react-native";
import NotAuthAlert from "../components/general/NotAuthAlert";
import { useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import AsCorrector from "../components/selectDuo/AsCorrector";
import AsReciter from "../components/selectDuo/AsReciter";

const SelectDuo = ({ navigation }) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "corrector", title: "كمصحح" },
    { key: "reciter", title: "كمسمع" },
  ]);
  const { state } = useContext(UserContext);

  const renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case "corrector":
        return <AsCorrector />;
      case "reciter":
        return <AsReciter />;
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
      initialLayout={{ width: layout.width }}
    />
  );
};

export default SelectDuo;
{
  /* {data?.map((item) => {
        return <Text key={item.reciterID}>{item.corrector.username}</Text>;
      })} */
}
// </Box>
