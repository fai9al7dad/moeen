import { useNavigation } from "@react-navigation/native";
import React, {
  Children,
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Dimensions } from "react-native";
import { DataProvider, LayoutProvider } from "recyclerlistview";
import { getQuran } from "../utils/sqlite/getQuran";
export const QuranContext = createContext<any>(null);

export const QuranProvider = ({ children }) => {
  const { width, height } = Dimensions.get("window");
  const navigation = useNavigation();
  const [dataProvider, setDataProvider] = useState(
    new DataProvider((r1, r2) => {
      return r1[0].wordID !== r2[0].wordID;
    })
  );

  const layoutProvider = useMemo(() => {
    return new LayoutProvider(
      (i) => {
        return 1;
      },
      (type, dim) => {
        dim.width = width;
        dim.height = height;
      }
    );
  }, [dataProvider]);

  useEffect(() => {
    const get = async () => {
      let quran: any = await getQuran();
      let data = new DataProvider((r1, r2) => {
        return r1[0].wordID !== r2[0].wordID;
      }).cloneWithRows(quran);

      setDataProvider(data);
    };
    get();
  }, []);
  const value = {
    dataProvider,
    setDataProvider,
    layoutProvider,
    navigation,
  };

  return (
    <QuranContext.Provider value={value}>{children}</QuranContext.Provider>
  );
};
