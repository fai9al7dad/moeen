import React from "react";
import Svg, {
  Defs,
  G,
  Image,
  Pattern,
  Rect,
  Text,
  TSpan,
} from "react-native-svg";

const Logo = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="120"
      height="120"
      viewBox="0 0 1168 1168"
    >
      <Defs>
        <Pattern
          id="pattern"
          preserveAspectRatio="xMidYMid slice"
          width="100%"
          height="100%"
          viewBox="0 0 337 366"
        >
          <Image width="337" height="366" />
        </Pattern>
      </Defs>
      <G id="Group_22" dataName="Group 22" transform="translate(-7701 -364)">
        <Rect
          id="Rectangle_29"
          dataName="Rectangle 29"
          width="1168"
          height="1168"
          transform="translate(7701 364)"
          fill="#34d399"
        />
        <Text
          id="_"
          dataName="ﱊ"
          transform="translate(7923 439)"
          fill="#fff"
          fontSize="500"
        >
          <TSpan x="0" y="597">
            ﱊ
          </TSpan>
        </Text>
        <Rect
          id="Rectangle_31"
          dataName="Rectangle 31"
          width="232"
          height="219"
          transform="translate(8430 596)"
          fill="#34d399"
        />
        <G id="Group_20" dataName="Group 20" transform="translate(3360 -148)">
          <Rect
            id="image-removebg-preview_1_"
            dataName="image-removebg-preview (1)"
            width="176"
            height="197"
            transform="translate(5097 766)"
            fill="url(#pattern)"
          />
        </G>
        <Rect
          id="Rectangle_30"
          dataName="Rectangle 30"
          width="332.64"
          height="138.727"
          transform="translate(7859.059 1153.394) rotate(-14)"
          fill="#34d399"
        />
      </G>
    </Svg>
  );
};

export default Logo;
