import React from "react";
import Svg, {
  Defs,
  Ellipse,
  G,
  LinearGradient,
  Path,
  Rect,
  Stop,
} from "react-native-svg";
import { Box, Text } from "native-base";
import { Dimensions } from "react-native";

const Warning = React.memo(() => {
  const { width, height } = Dimensions.get("window");

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width * 0.9}
      height={height * 0.4}
      viewBox="0 0 508.491 492.747"
      style={{ position: "relative" }}
    >
      <Box position={"absolute"} top={height * 0.11} left={width * 0.34}>
        <Text color="white" fontFamily={"montserrat-bold"} fontSize="4xl">
          تنبيه
        </Text>
      </Box>
      <Defs>
        <LinearGradient
          id="linear-gradient"
          x1="0.497"
          y1="-0.196"
          x2="0.506"
          y2="1.923"
          gradientUnits="objectBoundingBox"
        >
          <Stop offset="0" stopOpacity="0" />
          <Stop offset="0.95" />
        </LinearGradient>
        <LinearGradient
          id="linear-gradient-2"
          x1="0.612"
          y1="0.927"
          x2="0.412"
          y2="-0.177"
          gradientUnits="objectBoundingBox"
        >
          <Stop offset="0" stopOpacity="0" />
          <Stop offset="0.99" />
        </LinearGradient>
        <LinearGradient
          id="linear-gradient-3"
          x1="0.551"
          y1="0.792"
          x2="0.438"
          y2="-0.593"
        />
        <LinearGradient
          id="linear-gradient-4"
          x1="0.483"
          y1="1.425"
          x2="0.505"
          y2="0.25"
        />
      </Defs>
      <G id="Group_15" dataName="Group 15" transform="translate(2020 -674.404)">
        <G id="Group_14" dataName="Group 14">
          <Path
            id="Path_101"
            dataName="Path 101"
            d="M210.629,331.748c33.345,14.657,71.059,14.431,107.483,13.947,19.107-.242,38.875-.629,56.273-8.546,24.186-11.013,39.891-34.651,61.11-50.646,24.364-18.4,55.548-26.331,79.17-45.664a102.211,102.211,0,0,0,2.628-156.017c-12.5-10.932-27.411-18.656-42.2-26.25L400.845,20.359C383.448,11.41,365.6,2.316,346.185-.119c-16.382-2.048-32.958.79-48.969,4.45-45.631,10.319-90.908,28.1-124.382,60.659-28.8,28.056-47.6,65.738-79.105,90.714-8.062,6.369-16.995,12-22.864,20.413-21.123,30.329.274,69.076,27.717,84.619C136.587,282.247,170.786,314.253,210.629,331.748Z"
            transform="translate(-2075.66 675.21)"
            fill="#34d399"
            opacity="0.18"
          />
          <Ellipse
            id="Ellipse_5"
            dataName="Ellipse 5"
            cx="254.245"
            cy="31.41"
            rx="254.245"
            ry="31.41"
            transform="translate(-2020 1104.332)"
            fill="#34d399"
          />
          <Ellipse
            id="Ellipse_6"
            dataName="Ellipse 6"
            cx="254.245"
            cy="31.41"
            rx="254.245"
            ry="31.41"
            transform="translate(-2020 1104.332)"
            fill="url(#linear-gradient)"
          />
          <Path
            id="Path_102"
            dataName="Path 102"
            d="M150.116,97.787a42.568,42.568,0,0,0-32.539-6.45,12.335,12.335,0,0,0-5.611,2.4c-3.821,3.225-3.225,9.223-4.241,14.157-1.242,6.079-5.321,11.287-6.788,17.285a38.94,38.94,0,0,0-.145,13.673,225.348,225.348,0,0,0,12.754,52.274L95.81,424.784s18.14,2.935,54.935,5.869l3.9-222.513Z"
            transform="translate(-2055.151 731.096)"
            fill="#eea886"
          />
          <Path
            id="Path_103"
            dataName="Path 103"
            d="M58.79,208.065l23.493,95V166.045L71.834,134.99Z"
            transform="translate(-1983.996 757.083)"
            fill="url(#linear-gradient-2)"
          />
          <Path
            id="Path_104"
            dataName="Path 104"
            d="M309.255,98.989a42.6,42.6,0,0,1,32.538-6.321,12.577,12.577,0,0,1,5.627,2.4c3.805,3.225,3.225,9.223,4.225,14.173,1.258,6.079,5.337,11.287,6.8,17.285a38.473,38.473,0,0,1,.129,13.657,224.319,224.319,0,0,1-12.738,52.274l17.656,230.4s-19.752,3.322-55.048,6.659L304.66,209.455Z"
            transform="translate(-1927.248 731.894)"
            fill="#eea886"
          />
          <Path
            id="Path_105"
            dataName="Path 105"
            d="M274.2,177.092l-8.336,42.81-17.753,38.617L246.55,174.48Z"
            transform="translate(-1869.009 781.268)"
            fill="url(#linear-gradient-3)"
          />
          <Rect
            id="Rectangle_21"
            dataName="Rectangle 21"
            width="341.364"
            height="215.048"
            rx="8.37"
            transform="translate(-1935.123 752.455)"
            fill="#34d399"
          />
          <Rect
            id="Rectangle_22"
            dataName="Rectangle 22"
            width="341.364"
            height="215.048"
            rx="8.37"
            transform="translate(-1935.123 752.455)"
            fill="url(#linear-gradient-4)"
          />
          <Rect
            id="Rectangle_23"
            dataName="Rectangle 23"
            width="341.364"
            height="215.048"
            rx="8.37"
            transform="translate(-1935.123 742.828)"
            fill="#34d399"
          />
          <Path
            id="Path_121"
            dataName="Path 121"
            d="M128.616,94.942a8.836,8.836,0,0,1,3.418,3.015,10.787,10.787,0,0,1,1.016,4.837l.484,10.4a10.529,10.529,0,0,1-.6,5.063,3.66,3.66,0,0,1-4.16,2.193,15.624,15.624,0,0,1-1.338,12.238,9.771,9.771,0,0,0-1.209,2.515,9.335,9.335,0,0,0,.161,3.225,18.527,18.527,0,0,1-4.305,14.657,6.563,6.563,0,0,1-1.9,1.612,8.062,8.062,0,0,1-3.031.645l-4.74.4a1.612,1.612,0,0,1-2.112-1.435,105.806,105.806,0,0,1-4.837-35.328,101.585,101.585,0,0,1,2.161-17.93c.758-3.451,2.241-8.707,5.934-10.11C118.329,89.267,124.489,92.572,128.616,94.942Z"
            transform="translate(-2049.276 731.119)"
            fill="#eea886"
          />
          <Path
            id="Path_122"
            dataName="Path 122"
            d="M314.82,94.62a8.836,8.836,0,0,0-3.418,3.015,10.787,10.787,0,0,0-1.016,4.837l-.484,10.4a10.53,10.53,0,0,0,.6,5.063,3.66,3.66,0,0,0,4.16,2.193,15.689,15.689,0,0,0,1.322,12.238,9.32,9.32,0,0,1,1.225,2.515,8.981,8.981,0,0,1-.177,3.225,18.607,18.607,0,0,0,4.321,14.657,6.563,6.563,0,0,0,1.9,1.612,8.063,8.063,0,0,0,3.031.645l4.789.468a1.612,1.612,0,0,0,2.112-1.435,105.8,105.8,0,0,0,4.837-35.328,100.149,100.149,0,0,0-2.177-17.93c-.742-3.451-1.612-7.772-5.273-9.175C325.752,89.863,318.948,92.249,314.82,94.62Z"
            transform="translate(-1924.09 731.442)"
            fill="#eea886"
          />
        </G>
      </G>
    </Svg>
  );
});

export default Warning;
