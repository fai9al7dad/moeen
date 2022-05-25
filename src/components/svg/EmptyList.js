import React from "react";
import { Dimensions } from "react-native";
import Svg, { Defs, G, Rect } from "react-native-svg";

const EmptyList = () => {
  const { width, height } = Dimensions.get("window");

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width * 0.97}
      height={height * 0.35}
      viewBox="0 0 490 364"
    >
      <G id="Group_19" dataName="Group 19" transform="translate(1615 1297)">
        <G id="Group_16" dataName="Group 16">
          <G
            id="Rectangle_25"
            dataName="Rectangle 25"
            transform="translate(-1583 -1297)"
            fill="#fffcf7"
            stroke="#d1fae5"
            stroke-width="2"
          >
            <Rect width="458" height="106" rx="17" stroke="none" />
            <Rect x="1" y="1" width="456" height="104" rx="16" fill="none" />
          </G>
          <Rect
            id="Rectangle_26"
            dataName="Rectangle 26"
            width="339"
            height="30"
            rx="10"
            transform="translate(-1547 -1279)"
            fill="#a7f3d0"
          />
          <Rect
            id="Rectangle_27"
            dataName="Rectangle 27"
            width="198"
            height="30"
            rx="10"
            transform="translate(-1406 -1239)"
            fill="#d1fae5"
          />
          <Rect
            id="Rectangle_28"
            dataName="Rectangle 28"
            width="39"
            height="39"
            rx="10"
            transform="translate(-1185 -1279)"
            fill="#d1fae5"
          />
        </G>
        <G id="Group_17" dataName="Group 17" transform="translate(-32 129)">
          <G
            id="Rectangle_25-2"
            dataName="Rectangle 25"
            transform="translate(-1583 -1297)"
            fill="#fffcf7"
            stroke="#d1fae5"
            stroke-width="2"
          >
            <Rect width="458" height="106" rx="17" stroke="none" />
            <Rect x="1" y="1" width="456" height="104" rx="16" fill="none" />
          </G>
          <Rect
            id="Rectangle_26-2"
            dataName="Rectangle 26"
            width="339"
            height="30"
            rx="10"
            transform="translate(-1547 -1279)"
            fill="#a7f3d0"
          />
          <Rect
            id="Rectangle_27-2"
            dataName="Rectangle 27"
            width="198"
            height="30"
            rx="10"
            transform="translate(-1406 -1239)"
            fill="#d1fae5"
          />
          <Rect
            id="Rectangle_28-2"
            dataName="Rectangle 28"
            width="39"
            height="39"
            rx="10"
            transform="translate(-1185 -1279)"
            fill="#d1fae5"
          />
        </G>
        <G id="Group_18" dataName="Group 18" transform="translate(0 258)">
          <G
            id="Rectangle_25-3"
            dataName="Rectangle 25"
            transform="translate(-1583 -1297)"
            fill="#fffcf7"
            stroke="#d1fae5"
            stroke-width="2"
          >
            <Rect width="458" height="106" rx="17" stroke="none" />
            <Rect x="1" y="1" width="456" height="104" rx="16" fill="none" />
          </G>
          <Rect
            id="Rectangle_26-3"
            dataName="Rectangle 26"
            width="339"
            height="30"
            rx="10"
            transform="translate(-1547 -1279)"
            fill="#a7f3d0"
          />
          <Rect
            id="Rectangle_27-3"
            dataName="Rectangle 27"
            width="198"
            height="30"
            rx="10"
            transform="translate(-1406 -1239)"
            fill="#d1fae5"
          />
          <Rect
            id="Rectangle_28-3"
            dataName="Rectangle 28"
            width="39"
            height="39"
            rx="10"
            transform="translate(-1185 -1279)"
            fill="#d1fae5"
          />
        </G>
      </G>
    </Svg>
  );
};

export default EmptyList;
