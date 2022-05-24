import { View, Text } from "react-native";
import React, { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

export const UserContext = createContext<any>(null);

const ACTION_TYPES = {
  CHECK_TOKEN: "check_token",
  LOGIN: "login",
  REMOVE_TOKEN: "removeToken",
  GET_STATE: "getState",
};
const UserProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case ACTION_TYPES.CHECK_TOKEN:
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case ACTION_TYPES.LOGIN:
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            isSignedIn: true,
          };
        case ACTION_TYPES.REMOVE_TOKEN:
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
        case ACTION_TYPES.GET_STATE:
          return {
            ...prevState,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      isSignedIn: false,
    }
  );
  useEffect(() => {
    const bootstrapAsync = async () => {
      // await SecureStore.deleteItemAsync("userToken");

      let userToken;
      try {
        userToken = await SecureStore.getItemAsync("userToken");
      } catch (e) {
        console.log("e from token checking, possible no token", e);
        dispatch({ type: ACTION_TYPES.REMOVE_TOKEN });
      }

      try {
        let user = await axios.get("/api/users/me", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;

        console.log("logged in");
        dispatch({ type: ACTION_TYPES.CHECK_TOKEN, token: userToken });
      } catch (e: any) {
        dispatch({ type: ACTION_TYPES.REMOVE_TOKEN });

        console.log("not logged in", e.response.data);
      }
    };
    bootstrapAsync();
  }, []);
  const authContext = {
    login: async (data: {
      accessToken: string;
      userID: number;
      userName: string;
    }) => {
      console.log("setted token");

      await SecureStore.setItemAsync("userToken", data?.accessToken);
      dispatch({ type: ACTION_TYPES.LOGIN, token: data?.accessToken });
      console.log(state.userToken);
    },
    logout: () => dispatch({ type: ACTION_TYPES.REMOVE_TOKEN }),
    state: state,
  };
  return (
    <UserContext.Provider value={authContext}>{children}</UserContext.Provider>
  );
};

export default UserProvider;

// const authContext = React.useMemo(
//   () => ({
//     login: async (data: {
//       accessToken: string;
//       userID: number;
//       userName: string;
//     }) => {
//       console.log("setted token");

//       await SecureStore.setItemAsync("userToken", data?.accessToken);
//       dispatch({ type: ACTION_TYPES.LOGIN, token: data?.accessToken });
//       console.log(state.userToken);
//     },
//     logout: () => dispatch({ type: ACTION_TYPES.LOGOUT }),
//     state: state,
//   }),
//   []
// );
