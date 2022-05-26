import { Pressable } from "native-base";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { inject, observer } from "mobx-react";

interface props {
  store?: any;
}
const HeaderDuoOrWerd: React.FC<props> = ({ store }) => {
  const navigation: any = useNavigation();
  if (!store.isWerd) {
    return (
      <Pressable
        mr={2}
        rounded="lg"
        onPress={() => navigation.navigate("SelectDuo")}
      >
        <Ionicons name="ios-people-circle-sharp" size={24} color="#059669" />
      </Pressable>
    );
  } else {
    return (
      <Pressable
        mr={2}
        rounded="lg"
        onPress={() => navigation.navigate("FinishWerd")}
      >
        <Ionicons name="ios-people-circle-sharp" size={24} color="red" />
      </Pressable>
    );
  }
};

export default inject("store")(observer(HeaderDuoOrWerd));
