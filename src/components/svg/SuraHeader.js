import { Box, Text } from "native-base";
import React from "react";
import { Dimensions } from "react-native";
import Svg, { Circle, G, Line, Path } from "react-native-svg";

{
  /* <Box
  width={width}
  height={"60px"}
  justifyContent={"center"}
  alignItems="center"
>
  <Box position={"absolute"}>
    <Text
      fontFamily={"surahname"}
      fontSize="3xl"
      // background={"red.100"}
    >
      {chapterCodes}surah
    </Text>
  </Box>
</Box>; */
}
const SuraHeader = ({ chapterCode }) => {
  const { width } = Dimensions.get("window");
  let chapterCodes = ("00" + chapterCode).slice(-3);
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width * 0.99}
      height={60}
      viewBox="0 0 465.768 50.549"
      style={{ position: "relative" }}
    >
      <Box
        width={width}
        height={"60px"}
        justifyContent={"center"}
        alignItems="center"
      >
        <Box position={"absolute"}>
          <Text
            fontFamily={"surahname"}
            fontSize="3xl"
            // background={"red.100"}
          >
            {chapterCodes}surah
          </Text>
        </Box>
      </Box>
      <G id="Group_13" dataName="Group 13" transform="translate(-0.817 -0.628)">
        <G id="Group_3" dataName="Group 3" transform="translate(1.156 0.922)">
          <Path
            id="Path_1"
            dataName="Path 1"
            d="M462.2.922,5.206.953a4.025,4.025,0,0,0-4.05,4v42a4.025,4.025,0,0,0,4.05,4L462.2,50.921a4.025,4.025,0,0,0,4.05-4v-42A4.025,4.025,0,0,0,462.2.922Zm-117.251,41.9-4.242,4.1H204.027l-69.226.031h-8.1l-4.242-4.1a16.4,16.4,0,0,1,.064-32.805l4.178-4.1h8.1l69.226-.031H340.707l4.178,4.1a16.4,16.4,0,0,1,.064,32.805Z"
            transform="translate(-1.156 -0.922)"
            fill="#047857"
            fillRule="evenodd"
          />
        </G>
        <G id="Group_6" dataName="Group 6" transform="translate(240.915 1.003)">
          <Path
            id="Path_2"
            dataName="Path 2"
            d="M235.71,6.152H336.489l.4.3a26.476,26.476,0,0,1,3.149,2.7q.6.6,1.15,1.25a15.041,15.041,0,0,1,10.55,4.65,16.969,16.969,0,0,1,2.2,2.7,15.3,15.3,0,0,1,1.375,2.6,15.941,15.941,0,0,1,1.125,5.85m68-10h.9a31.105,31.105,0,0,1,4.7.55,23.651,23.651,0,0,1,6.051,2.1,26.1,26.1,0,0,1,6.8,4.95,26.372,26.372,0,0,1,2.25,2.55,24.942,24.942,0,0,0,5.45-16h-38.05a15.469,15.469,0,0,0-10.949,4.7,15.618,15.618,0,0,0-2.1,2.6m-3.449-2.5a19.377,19.377,0,0,1,1.3-1.75q.6-.7,1.25-1.35.949-.9,1.949-1.7H389.088a22.912,22.912,0,0,1,1.9,1.7,21,21,0,0,1,3.851,5.2,19.589,19.589,0,0,1,2.1,8.85v.6a15.568,15.568,0,0,0,2.55,8.45,16.786,16.786,0,0,0,2.1,2.551,15.465,15.465,0,0,0,10.949,4.7l38.05-.051a25.081,25.081,0,0,0-5.45-16,22.354,22.354,0,0,1-2.25,2.5,26.83,26.83,0,0,1-6.75,5.051,24.6,24.6,0,0,1-6.05,2.1,31.3,31.3,0,0,1-4.75.551h-.9m-68-10.351v.2a20.776,20.776,0,0,0,.95,6.349,19.36,19.36,0,0,0,1.149,2.8,20.379,20.379,0,0,0,3.8,5.15,19.6,19.6,0,0,0,13.85,5.949h79M356.438,26.2c0,.065,0,.132,0,.2M455.186,6.152h-79A20.255,20.255,0,0,0,358.537,17.3m-4.6,17.751a18.259,18.259,0,0,1-2.2,2.65,15.235,15.235,0,0,1-10.55,4.7c-.367.4-.75.8-1.15,1.2a26.867,26.867,0,0,1-3.2,2.75c-.133.1-.267.2-.4.3h-97.3M394.787,35.6a19.561,19.561,0,0,1-3.8,5.1q-.9.9-1.85,1.7h11.35a23.073,23.073,0,0,1-1.9-1.7q-.651-.651-1.2-1.3c-.423-.5-.814-1.014-1.175-1.525M239.991,6.152h-.8"
            transform="translate(-235.191 -1.003)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_3"
            dataName="Path 3"
            d="M235.191,50.8H456.486q4,0,4-4V5q0-4-4-4H235.191"
            transform="translate(-235.191 -1.003)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_4"
            dataName="Path 4"
            d="M351.785,37.7a16.743,16.743,0,0,0,2.1-2.551,15.576,15.576,0,0,0,2.55-8.45v-.6a19.563,19.563,0,0,1,2.1-8.85,21,21,0,0,1,3.851-5.2"
            transform="translate(-235.194 -1.003)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_5"
            dataName="Path 5"
            d="M359.491,9.152a25.344,25.344,0,0,1,3.6-3H340.942a19.462,19.462,0,0,1,13.75,5.9q.7.7,1.35,1.45A23.293,23.293,0,0,1,359.491,9.152Z"
            transform="translate(-235.194 -1.003)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_6"
            dataName="Path 6"
            d="M359.491,43.6a24.057,24.057,0,0,1-3.45-4.3q-.649.7-1.35,1.4a19.379,19.379,0,0,1-13.75,5.949h22.2A25.657,25.657,0,0,1,359.491,43.6Z"
            transform="translate(-235.194 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_7"
            dataName="Path 7"
            d="M450.691,26.252a29.745,29.745,0,0,1,4.5,15V10.9a30.433,30.433,0,0,1-3.4,13.5A20.387,20.387,0,0,1,450.691,26.252Z"
            transform="translate(-235.196 -1.003)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_8"
            dataName="Path 8"
            d="M446.942,13.5a19.288,19.288,0,0,1-2,6.75,21.758,21.758,0,0,0-12.75-6.667"
            transform="translate(-235.196 -1.003)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_9"
            dataName="Path 9"
            d="M446.942,39.336a19.294,19.294,0,0,0-2-6.75,21.76,21.76,0,0,1-12.75,6.666"
            transform="translate(-235.196 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <G
            id="Group_5"
            dataName="Group 5"
            transform="translate(166.063 13.875)"
          >
            <Path
              id="Path_10"
              dataName="Path 10"
              d="M413.841,37.842"
              transform="translate(-401.258 -14.879)"
              fill="none"
              stroke="#6ee7b7"
              strokeMiterlimit="10"
              strokeWidth="0.75"
              fillRule="evenodd"
            />
            <Path
              id="Path_11"
              dataName="Path 11"
              d="M413.841,14.932"
              transform="translate(-401.258 -14.878)"
              fill="none"
              stroke="#6ee7b7"
              strokeMiterlimit="10"
              strokeWidth="0.75"
              fillRule="evenodd"
            />
            <Path
              id="Path_12"
              dataName="Path 12"
              d="M408.924,26.388a15.783,15.783,0,0,1,4.917-11.456c-.354-.033-.712-.054-1.075-.054a11.509,11.509,0,0,0,0,23.017c.363,0,.721-.021,1.075-.055A15.773,15.773,0,0,1,408.924,26.388Z"
              transform="translate(-401.258 -14.878)"
              fill="none"
              stroke="#6ee7b7"
              strokeMiterlimit="10"
              strokeWidth="0.75"
              fillRule="evenodd"
            />
            <Path
              id="Path_13"
              dataName="Path 13"
              d="M413.841,14.932a15.8,15.8,0,0,0,0,22.909"
              transform="translate(-401.258 -14.878)"
              fill="none"
              stroke="#6ee7b7"
              strokeMiterlimit="10"
              strokeWidth="0.75"
              fillRule="evenodd"
            />
          </G>
          <Path
            id="Path_14"
            dataName="Path 14"
            d="M377.759,15.975a7.493,7.493,0,0,1,1.02,3.988,9.888,9.888,0,0,1-.186,1.948,8.505,8.505,0,0,1,1.206-1.483,8.065,8.065,0,0,1,3.479-2.18,3.037,3.037,0,0,1,1.67,0,3.56,3.56,0,0,1-.093,1.577,7.277,7.277,0,0,1-2.088,3.571,8.492,8.492,0,0,1-1.483,1.206,9.437,9.437,0,0,1,1.947-.186,8.086,8.086,0,0,1,3.988.928,2.584,2.584,0,0,1,1.16,1.16,2.8,2.8,0,0,1-1.16,1.066,7.476,7.476,0,0,1-3.988,1.021,9.437,9.437,0,0,1-1.947-.186,9.4,9.4,0,0,1,1.53,1.252,8.08,8.08,0,0,1,2.181,3.479,3.056,3.056,0,0,1,0,1.67,3.577,3.577,0,0,1-1.577-.094,7.253,7.253,0,0,1-3.571-2.086,8.067,8.067,0,0,1-1.253-1.578,10.145,10.145,0,0,1,.186,1.994,8.085,8.085,0,0,1-.927,3.988,2.6,2.6,0,0,1-1.16,1.16,2.816,2.816,0,0,1-1.067-1.16,7.485,7.485,0,0,1-1.02-3.988,7.627,7.627,0,0,1,.232-1.947,11.887,11.887,0,0,1-1.3,1.531,8.068,8.068,0,0,1-3.479,2.18,3.057,3.057,0,0,1-1.67,0,3.583,3.583,0,0,1,.094-1.578,7.26,7.26,0,0,1,2.088-3.57,8.019,8.019,0,0,1,1.575-1.252,10.194,10.194,0,0,1-1.993.186,8.1,8.1,0,0,1-3.988-.928,2.584,2.584,0,0,1-1.16-1.16,2.8,2.8,0,0,1,1.16-1.066,7.49,7.49,0,0,1,3.988-1.021,7.668,7.668,0,0,1,1.947.231,11.793,11.793,0,0,1-1.529-1.3,8.091,8.091,0,0,1-2.182-3.479,3.071,3.071,0,0,1,0-1.669,3.574,3.574,0,0,1,1.577.093,7.263,7.263,0,0,1,3.571,2.087,8.01,8.01,0,0,1,1.253,1.577,10.151,10.151,0,0,1-.186-1.995,8.082,8.082,0,0,1,.928-3.988,2.6,2.6,0,0,1,1.159-1.16A2.808,2.808,0,0,1,377.759,15.975Z"
            transform="translate(-235.194 -1.003)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_15"
            dataName="Path 15"
            d="M374.79,21.958a5.273,5.273,0,0,1,.788,1.948.376.376,0,0,0,.046.139.146.146,0,0,0,.047.093,2.245,2.245,0,0,1,1.021-.231,2.271,2.271,0,0,1,.928.185.5.5,0,0,1,.047-.232,6.247,6.247,0,0,1,.927-1.948"
            transform="translate(-235.194 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_16"
            dataName="Path 16"
            d="M372.1,24.647a6.06,6.06,0,0,0,1.9.835.9.9,0,0,0,.278.046c0,.03.032.046.093.046a2.063,2.063,0,0,1,.557-.974,1.941,1.941,0,0,1,.7-.464v-.093"
            transform="translate(-235.194 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Line
            id="Line_1"
            dataName="Line 1"
            x2="0.047"
            transform="translate(140.43 23.133)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
          />
          <Path
            id="Path_17"
            dataName="Path 17"
            d="M372.146,28.4a5.288,5.288,0,0,1,1.948-.789h.139a1.7,1.7,0,0,1,.232-.186,2.375,2.375,0,0,1-.232-1.066,2.22,2.22,0,0,1,.14-.789"
            transform="translate(-235.194 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_18"
            dataName="Path 18"
            d="M374.232,27.615l.28-.094a.127.127,0,0,1-.048-.092"
            transform="translate(-235.194 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_19"
            dataName="Path 19"
            d="M377.619,24.091a2.041,2.041,0,0,1,.788.51,2.543,2.543,0,0,1,.6.928.13.13,0,0,1,.093-.046.188.188,0,0,1,.139-.046,6.476,6.476,0,0,0,2.041-.835"
            transform="translate(-235.194 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_20"
            dataName="Path 20"
            d="M379.011,25.529a2.6,2.6,0,0,1-.046,1.807.3.3,0,0,0,.186.141.812.812,0,0,1,.231.045,5.583,5.583,0,0,1,1.9.883"
            transform="translate(-235.194 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_21"
            dataName="Path 21"
            d="M379.15,27.477a.509.509,0,0,1-.232-.047,2.054,2.054,0,0,1-.511.65,3.993,3.993,0,0,1-.7.555,3.282,3.282,0,0,1,.093.371V29.1a5.279,5.279,0,0,0,.788,1.947"
            transform="translate(-235.194 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_22"
            dataName="Path 22"
            d="M378.965,27.336a.135.135,0,0,0-.047.094"
            transform="translate(-235.194 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_23"
            dataName="Path 23"
            d="M377.8,29.006c-.093-.123-.171-.23-.231-.324a2.738,2.738,0,0,1-.882.139,2.187,2.187,0,0,1-.787-.139l-.187.279a.748.748,0,0,1-.047.23,6.064,6.064,0,0,1-.834,1.9"
            transform="translate(-235.194 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_24"
            dataName="Path 24"
            d="M377.712,28.635a.188.188,0,0,0-.139.047"
            transform="translate(-235.194 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_25"
            dataName="Path 25"
            d="M375.718,28.961a1.362,1.362,0,0,0,.046-.326,2.486,2.486,0,0,1-.835-.555,2.615,2.615,0,0,1-.416-.559"
            transform="translate(-235.194 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_26"
            dataName="Path 26"
            d="M375.9,28.682a.193.193,0,0,1-.141-.047"
            transform="translate(-235.194 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_27"
            dataName="Path 27"
            d="M387.99,15.052a15.427,15.427,0,0,1,4.7,11.05v.6a15.262,15.262,0,0,1-4.7,11,15.3,15.3,0,0,1-11.3,4.7,15.959,15.959,0,0,1-16-16,15.551,15.551,0,0,1,4.65-11.351,15.464,15.464,0,0,1,11.35-4.7A15.3,15.3,0,0,1,387.99,15.052Z"
            transform="translate(-235.194 -1.003)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_28"
            dataName="Path 28"
            d="M433.457,21.076"
            transform="translate(-235.196 -1.003)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_29"
            dataName="Path 29"
            d="M433.457,31.7"
            transform="translate(-235.196 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_30"
            dataName="Path 30"
            d="M433.457,31.7a10.125,10.125,0,0,0,0-10.623"
            transform="translate(-235.196 -1.003)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_31"
            dataName="Path 31"
            d="M424.765,16.21a10.177,10.177,0,0,0,0,20.354"
            transform="translate(-235.195 -1.003)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Circle
            id="Ellipse_1"
            dataName="Ellipse 1"
            cx="5.343"
            cy="5.343"
            r="5.343"
            transform="translate(184.228 20.041)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
          />
          <Circle
            id="Ellipse_2"
            dataName="Ellipse 2"
            cx="2.396"
            cy="2.396"
            r="2.396"
            transform="translate(139.149 22.999)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
          />
          <Path
            id="Path_32"
            dataName="Path 32"
            d="M381.6,15.4h.046a.923.923,0,0,1,.231.6v.139a.808.808,0,0,1-.231.417.7.7,0,0,1-.555.278.87.87,0,0,1-.834-.833.923.923,0,0,1,.231-.6.816.816,0,0,1,.6-.231A.61.61,0,0,1,381.6,15.4Z"
            transform="translate(-235.195 -1.003)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_33"
            dataName="Path 33"
            d="M371.737,15.349a.618.618,0,0,1,.555-.185l.046-.046a.965.965,0,0,1,.557.277l.092.092a.837.837,0,0,1,.14.416.695.695,0,0,1-.834.833.621.621,0,0,1-.555-.185.9.9,0,0,1,0-1.2Z"
            transform="translate(-235.194 -1.003)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_34"
            dataName="Path 34"
            d="M366.321,21.319a.8.8,0,0,1,.417.232.7.7,0,0,1,.277.555.747.747,0,0,1-.277.6.757.757,0,0,1-.555.231.923.923,0,0,1-.6-.231.819.819,0,0,1-.231-.6.619.619,0,0,1,.231-.509v-.046a.925.925,0,0,1,.6-.232Z"
            transform="translate(-235.194 -1.003)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_35"
            dataName="Path 35"
            d="M365.674,30.2a.815.815,0,0,1,.417-.139.693.693,0,0,1,.833.832.617.617,0,0,1-.186.555.9.9,0,0,1-1.2,0,.626.626,0,0,1-.186-.555l-.046-.045a.962.962,0,0,1,.277-.557C365.612,30.266,365.643,30.234,365.674,30.2Z"
            transform="translate(-235.194 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_36"
            dataName="Path 36"
            d="M373.126,37.008a.938.938,0,0,1-.231.6.817.817,0,0,1-.6.23.614.614,0,0,1-.509-.23h-.046a.922.922,0,0,1-.231-.6v-.139a.794.794,0,0,1,.231-.416.7.7,0,0,1,.555-.277.751.751,0,0,1,.6.277A.763.763,0,0,1,373.126,37.008Z"
            transform="translate(-235.194 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_37"
            dataName="Path 37"
            d="M387.193,21.366a.815.815,0,0,1,.6.231.626.626,0,0,1,.187.555l.046.047a.97.97,0,0,1-.278.556c-.03.03-.061.062-.094.092a.813.813,0,0,1-.415.139.694.694,0,0,1-.833-.833.617.617,0,0,1,.186-.555A.8.8,0,0,1,387.193,21.366Z"
            transform="translate(-235.195 -1.003)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_38"
            dataName="Path 38"
            d="M380.252,37.1a.695.695,0,0,1,.834-.834.621.621,0,0,1,.555.186.9.9,0,0,1,0,1.2.618.618,0,0,1-.555.186l-.047.047a.959.959,0,0,1-.556-.277c-.03-.031-.062-.062-.093-.092A.864.864,0,0,1,380.252,37.1Z"
            transform="translate(-235.195 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_39"
            dataName="Path 39"
            d="M388.027,30.9a.615.615,0,0,1-.232.51v.045a.922.922,0,0,1-.6.232h-.138a.8.8,0,0,1-.417-.232.7.7,0,0,1-.277-.555.866.866,0,0,1,.832-.832.92.92,0,0,1,.6.23A.815.815,0,0,1,388.027,30.9Z"
            transform="translate(-235.195 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_40"
            dataName="Path 40"
            d="M424.818,25.678a.815.815,0,0,1,.6.231.625.625,0,0,1,.187.555l.046.047a.964.964,0,0,1-.278.555c-.03.031-.061.062-.094.092a.8.8,0,0,1-.415.139.694.694,0,0,1-.833-.833.617.617,0,0,1,.186-.555A.8.8,0,0,1,424.818,25.678Z"
            transform="translate(-235.196 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_41"
            dataName="Path 41"
            d="M404.818,25.678a.815.815,0,0,1,.6.231.625.625,0,0,1,.187.555l.046.047a.964.964,0,0,1-.278.555c-.03.031-.061.062-.094.092a.8.8,0,0,1-.415.139.694.694,0,0,1-.833-.833.617.617,0,0,1,.186-.555A.8.8,0,0,1,404.818,25.678Z"
            transform="translate(-235.195 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_42"
            dataName="Path 42"
            d="M442.985,13.345a.815.815,0,0,1,.6.231.626.626,0,0,1,.187.555l.046.047a.97.97,0,0,1-.278.556c-.03.03-.061.062-.094.092a.813.813,0,0,1-.415.139.694.694,0,0,1-.833-.833.618.618,0,0,1,.186-.555A.8.8,0,0,1,442.985,13.345Z"
            transform="translate(-235.196 -1.003)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_43"
            dataName="Path 43"
            d="M355.568,8.011a.815.815,0,0,1,.6.231.626.626,0,0,1,.187.555l.046.047a.97.97,0,0,1-.278.556c-.03.03-.061.062-.094.092a.813.813,0,0,1-.415.139.694.694,0,0,1-.833-.833.617.617,0,0,1,.186-.555A.8.8,0,0,1,355.568,8.011Z"
            transform="translate(-235.194 -1.003)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_44"
            dataName="Path 44"
            d="M355.568,43.178a.814.814,0,0,1,.6.23.626.626,0,0,1,.187.555l.046.047a.97.97,0,0,1-.278.557c-.03.029-.061.061-.094.092a.822.822,0,0,1-.415.139.7.7,0,0,1-.833-.834.618.618,0,0,1,.186-.555A.8.8,0,0,1,355.568,43.178Z"
            transform="translate(-235.194 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_45"
            dataName="Path 45"
            d="M442.985,37.928a.814.814,0,0,1,.6.23.626.626,0,0,1,.187.555l.046.047a.969.969,0,0,1-.278.557c-.03.029-.061.061-.094.092a.822.822,0,0,1-.415.139.7.7,0,0,1-.833-.834.618.618,0,0,1,.186-.555A.8.8,0,0,1,442.985,37.928Z"
            transform="translate(-235.196 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_46"
            dataName="Path 46"
            d="M417.36,13.345a.815.815,0,0,1,.6.231.626.626,0,0,1,.187.555l.046.047a.97.97,0,0,1-.278.556c-.03.03-.061.062-.094.092a.813.813,0,0,1-.415.139.694.694,0,0,1-.833-.833.617.617,0,0,1,.186-.555A.8.8,0,0,1,417.36,13.345Z"
            transform="translate(-235.195 -1.003)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_47"
            dataName="Path 47"
            d="M417.36,37.928a.814.814,0,0,1,.6.23.626.626,0,0,1,.187.555l.046.047a.97.97,0,0,1-.278.557c-.03.029-.061.061-.094.092a.822.822,0,0,1-.415.139.7.7,0,0,1-.833-.834.618.618,0,0,1,.186-.555A.8.8,0,0,1,417.36,37.928Z"
            transform="translate(-235.195 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_48"
            dataName="Path 48"
            d="M438.99,25.076a.979.979,0,0,1,.725.278.754.754,0,0,1,.224.668l.055.057a1.167,1.167,0,0,1-.334.668c-.037.035-.073.073-.112.109a.992.992,0,0,1-.5.167.834.834,0,0,1-1-1,.743.743,0,0,1,.224-.668A.962.962,0,0,1,438.99,25.076Z"
            transform="translate(-235.196 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_49"
            dataName="Path 49"
            d="M405.725,21.709a.815.815,0,0,1,.6.231.626.626,0,0,1,.187.555l.046.047a.97.97,0,0,1-.278.556c-.03.03-.061.062-.094.092a.813.813,0,0,1-.415.139.694.694,0,0,1-.833-.833.617.617,0,0,1,.186-.555A.8.8,0,0,1,405.725,21.709Z"
            transform="translate(-235.195 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_50"
            dataName="Path 50"
            d="M405.725,29.709a.814.814,0,0,1,.6.23.628.628,0,0,1,.187.557l.046.047a.97.97,0,0,1-.278.555c-.03.031-.061.062-.094.092a.8.8,0,0,1-.415.139.693.693,0,0,1-.833-.832.62.62,0,0,1,.186-.557A.8.8,0,0,1,405.725,29.709Z"
            transform="translate(-235.195 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
        </G>
        <G id="Layer_1_copy" transform="translate(1.192 1.003)">
          <Path
            id="Path_51"
            dataName="Path 51"
            d="M105.24,26.2a15.94,15.94,0,0,1,1.125-5.85,15.293,15.293,0,0,1,1.375-2.6,16.969,16.969,0,0,1,2.2-2.7,15.041,15.041,0,0,1,10.55-4.65q.55-.649,1.15-1.25a26.558,26.558,0,0,1,3.149-2.7l.4-.3H235.966M62.191,17.652a15.618,15.618,0,0,0-2.1-2.6,15.471,15.471,0,0,0-10.949-4.7H11.092a24.946,24.946,0,0,0,5.45,16,26.486,26.486,0,0,1,2.25-2.55,26.132,26.132,0,0,1,6.8-4.95,23.636,23.636,0,0,1,6.051-2.1,31.248,31.248,0,0,1,4.7-.55h.9m0,20.351h-.9A31.172,31.172,0,0,1,31.591,36a24.605,24.605,0,0,1-6.05-2.1,26.83,26.83,0,0,1-6.75-5.051,22.356,22.356,0,0,1-2.25-2.5,25.077,25.077,0,0,0-5.45,16l38.05.051a15.468,15.468,0,0,0,10.949-4.7,16.742,16.742,0,0,0,2.1-2.551,15.576,15.576,0,0,0,2.55-8.45v-.6a19.563,19.563,0,0,1,2.1-8.85,21,21,0,0,1,3.851-5.2,23.068,23.068,0,0,1,1.9-1.7H61.142q1,.8,1.949,1.7.651.651,1.25,1.35a19.579,19.579,0,0,1,1.3,1.75m-59.15,31.5h79A19.606,19.606,0,0,0,99.34,40.7a20.4,20.4,0,0,0,3.8-5.15,19.208,19.208,0,0,0,1.149-2.8,20.778,20.778,0,0,0,.95-6.349v-.2m0,.2c0-.068,0-.135,0-.2m-2.1-8.9A20.255,20.255,0,0,0,85.49,6.152h-79m226.045,40.5h-107.3c-.133-.1-.267-.2-.4-.3a26.787,26.787,0,0,1-3.2-2.75c-.4-.4-.783-.8-1.15-1.2a15.235,15.235,0,0,1-10.55-4.7,18.314,18.314,0,0,1-2.2-2.65M65.466,37.876q-.54.768-1.175,1.525-.549.651-1.2,1.3a23.056,23.056,0,0,1-1.9,1.7h11.35q-.949-.8-1.85-1.7a19.542,19.542,0,0,1-3.8-5.1M232.486,6.152h-.8"
            transform="translate(-1.192 -1.003)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_52"
            dataName="Path 52"
            d="M236.486,50.8H5.192q-4,0-4-4V5q0-4,4-4H236.486"
            transform="translate(-1.192 -1.003)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_53"
            dataName="Path 53"
            d="M109.9,37.7a16.742,16.742,0,0,1-2.1-2.551,15.576,15.576,0,0,1-2.55-8.45v-.6a19.563,19.563,0,0,0-2.1-8.85,21,21,0,0,0-3.851-5.2"
            transform="translate(-1.194 -1.003)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_54"
            dataName="Path 54"
            d="M102.192,9.152a25.344,25.344,0,0,0-3.6-3H120.74a19.462,19.462,0,0,0-13.75,5.9q-.7.7-1.35,1.45A23.212,23.212,0,0,0,102.192,9.152Z"
            transform="translate(-1.194 -1.003)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_55"
            dataName="Path 55"
            d="M102.192,43.6a24.055,24.055,0,0,0,3.45-4.3q.649.7,1.35,1.4a19.379,19.379,0,0,0,13.75,5.949h-22.2A25.6,25.6,0,0,0,102.192,43.6Z"
            transform="translate(-1.194 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_56"
            dataName="Path 56"
            d="M10.992,26.252a29.744,29.744,0,0,0-4.5,15V10.9a30.434,30.434,0,0,0,3.4,13.5A20.851,20.851,0,0,0,10.992,26.252Z"
            transform="translate(-1.192 -1.003)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_57"
            dataName="Path 57"
            d="M14.741,13.5a19.288,19.288,0,0,0,2,6.75,21.759,21.759,0,0,1,12.75-6.667"
            transform="translate(-1.192 -1.003)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_58"
            dataName="Path 58"
            d="M14.741,39.336a19.294,19.294,0,0,1,2-6.75,21.761,21.761,0,0,0,12.75,6.666"
            transform="translate(-1.192 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <G
            id="Group_7"
            dataName="Group 7"
            transform="translate(46.65 13.875)"
          >
            <Path
              id="Path_59"
              dataName="Path 59"
              d="M47.843,37.842"
              transform="translate(-47.843 -14.879)"
              fill="none"
              stroke="#6ee7b7"
              strokeMiterlimit="10"
              strokeWidth="0.75"
              fillRule="evenodd"
            />
            <Path
              id="Path_60"
              dataName="Path 60"
              d="M47.843,14.932"
              transform="translate(-47.843 -14.878)"
              fill="none"
              stroke="#6ee7b7"
              strokeMiterlimit="10"
              strokeWidth="0.75"
              fillRule="evenodd"
            />
            <Path
              id="Path_61"
              dataName="Path 61"
              d="M52.76,26.388a15.783,15.783,0,0,0-4.917-11.456c.354-.033.712-.054,1.075-.054a11.509,11.509,0,0,1,0,23.017c-.363,0-.721-.021-1.075-.055A15.777,15.777,0,0,0,52.76,26.388Z"
              transform="translate(-47.843 -14.878)"
              fill="none"
              stroke="#6ee7b7"
              strokeMiterlimit="10"
              strokeWidth="0.75"
              fillRule="evenodd"
            />
            <Path
              id="Path_62"
              dataName="Path 62"
              d="M47.843,14.932a15.8,15.8,0,0,1,0,22.909"
              transform="translate(-47.843 -14.878)"
              fill="none"
              stroke="#6ee7b7"
              strokeMiterlimit="10"
              strokeWidth="0.75"
              fillRule="evenodd"
            />
          </G>
          <Path
            id="Path_63"
            dataName="Path 63"
            d="M83.925,15.975a7.492,7.492,0,0,0-1.02,3.988,9.89,9.89,0,0,0,.186,1.948,8.5,8.5,0,0,0-1.206-1.483,8.065,8.065,0,0,0-3.479-2.18,3.037,3.037,0,0,0-1.67,0,3.56,3.56,0,0,0,.093,1.577A7.277,7.277,0,0,0,78.917,23.4,8.494,8.494,0,0,0,80.4,24.6a9.437,9.437,0,0,0-1.947-.186,8.085,8.085,0,0,0-3.988.928,2.584,2.584,0,0,0-1.16,1.16,2.8,2.8,0,0,0,1.16,1.066,7.476,7.476,0,0,0,3.988,1.021A9.437,9.437,0,0,0,80.4,28.4a9.4,9.4,0,0,0-1.53,1.252,8.081,8.081,0,0,0-2.181,3.479,3.056,3.056,0,0,0,0,1.67,3.577,3.577,0,0,0,1.577-.094,7.253,7.253,0,0,0,3.571-2.086,8.07,8.07,0,0,0,1.253-1.578,10.143,10.143,0,0,0-.186,1.994,8.085,8.085,0,0,0,.927,3.988,2.6,2.6,0,0,0,1.16,1.16,2.816,2.816,0,0,0,1.067-1.16,7.485,7.485,0,0,0,1.02-3.988,7.627,7.627,0,0,0-.232-1.947,11.884,11.884,0,0,0,1.3,1.531,8.068,8.068,0,0,0,3.479,2.18,3.056,3.056,0,0,0,1.67,0,3.582,3.582,0,0,0-.094-1.578,7.259,7.259,0,0,0-2.088-3.57,8.021,8.021,0,0,0-1.575-1.252,10.194,10.194,0,0,0,1.993.186,8.1,8.1,0,0,0,3.988-.928,2.584,2.584,0,0,0,1.16-1.16,2.8,2.8,0,0,0-1.16-1.066,7.49,7.49,0,0,0-3.988-1.021,7.667,7.667,0,0,0-1.947.231,11.8,11.8,0,0,0,1.529-1.3,8.091,8.091,0,0,0,2.182-3.479,3.071,3.071,0,0,0,0-1.669,3.574,3.574,0,0,0-1.577.093,7.263,7.263,0,0,0-3.571,2.087,8.008,8.008,0,0,0-1.253,1.577,10.152,10.152,0,0,0,.186-1.995,8.082,8.082,0,0,0-.928-3.988,2.6,2.6,0,0,0-1.159-1.16A2.8,2.8,0,0,0,83.925,15.975Z"
            transform="translate(-1.194 -1.003)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_64"
            dataName="Path 64"
            d="M86.894,21.958a5.273,5.273,0,0,0-.788,1.948.376.376,0,0,1-.046.139.146.146,0,0,1-.047.093,2.246,2.246,0,0,0-1.021-.231,2.271,2.271,0,0,0-.928.185.5.5,0,0,0-.047-.232,6.246,6.246,0,0,0-.927-1.948"
            transform="translate(-1.194 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_65"
            dataName="Path 65"
            d="M89.584,24.647a6.06,6.06,0,0,1-1.9.835.9.9,0,0,1-.278.046c0,.03-.032.046-.093.046a2.063,2.063,0,0,0-.557-.974,1.941,1.941,0,0,0-.695-.464v-.093"
            transform="translate(-1.194 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Line
            id="Line_2"
            dataName="Line 2"
            x1="0.047"
            transform="translate(84.819 23.133)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
          />
          <Path
            id="Path_66"
            dataName="Path 66"
            d="M89.538,28.4a5.289,5.289,0,0,0-1.948-.789h-.139a1.7,1.7,0,0,0-.232-.186,2.375,2.375,0,0,0,.232-1.066,2.221,2.221,0,0,0-.14-.789"
            transform="translate(-1.194 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_67"
            dataName="Path 67"
            d="M87.451,27.615l-.28-.094a.127.127,0,0,0,.048-.092"
            transform="translate(-1.194 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_68"
            dataName="Path 68"
            d="M84.064,24.091a2.04,2.04,0,0,0-.788.51,2.543,2.543,0,0,0-.6.928.13.13,0,0,0-.093-.046.188.188,0,0,0-.139-.046A6.477,6.477,0,0,1,80.4,24.6"
            transform="translate(-1.194 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_69"
            dataName="Path 69"
            d="M82.673,25.529a2.6,2.6,0,0,0,.046,1.807.3.3,0,0,1-.186.141.813.813,0,0,0-.231.045,5.584,5.584,0,0,0-1.9.883"
            transform="translate(-1.194 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_70"
            dataName="Path 70"
            d="M82.533,27.477a.509.509,0,0,0,.232-.047,2.055,2.055,0,0,0,.511.65,3.993,3.993,0,0,0,.695.555,3.3,3.3,0,0,0-.093.371V29.1a5.278,5.278,0,0,1-.788,1.947"
            transform="translate(-1.194 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_71"
            dataName="Path 71"
            d="M82.719,27.336a.135.135,0,0,1,.047.094"
            transform="translate(-1.194 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_72"
            dataName="Path 72"
            d="M83.879,29.006c.093-.123.171-.23.231-.324a2.738,2.738,0,0,0,.882.139,2.187,2.187,0,0,0,.787-.139l.187.279a.749.749,0,0,0,.047.23,6.065,6.065,0,0,0,.834,1.9"
            transform="translate(-1.194 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_73"
            dataName="Path 73"
            d="M83.972,28.635a.188.188,0,0,1,.139.047"
            transform="translate(-1.194 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_74"
            dataName="Path 74"
            d="M85.966,28.961a1.366,1.366,0,0,1-.046-.326,2.485,2.485,0,0,0,.835-.555,2.615,2.615,0,0,0,.416-.559"
            transform="translate(-1.194 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_75"
            dataName="Path 75"
            d="M85.779,28.682a.193.193,0,0,0,.141-.047"
            transform="translate(-1.194 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_76"
            dataName="Path 76"
            d="M73.692,15.052a15.427,15.427,0,0,0-4.7,11.05v.6a15.262,15.262,0,0,0,4.7,11,15.3,15.3,0,0,0,11.3,4.7,15.959,15.959,0,0,0,16-16,15.551,15.551,0,0,0-4.65-11.351,15.464,15.464,0,0,0-11.35-4.7A15.3,15.3,0,0,0,73.692,15.052Z"
            transform="translate(-1.194 -1.003)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_77"
            dataName="Path 77"
            d="M28.227,21.076"
            transform="translate(-1.193 -1.003)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_78"
            dataName="Path 78"
            d="M28.227,31.7"
            transform="translate(-1.193 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_79"
            dataName="Path 79"
            d="M28.227,31.7a10.125,10.125,0,0,1,0-10.623"
            transform="translate(-1.193 -1.003)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_80"
            dataName="Path 80"
            d="M36.919,16.21a10.177,10.177,0,0,1,0,20.354"
            transform="translate(-1.193 -1.003)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Circle
            id="Ellipse_3"
            dataName="Ellipse 3"
            cx="5.343"
            cy="5.343"
            r="5.343"
            transform="translate(30.382 20.041)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
          />
          <Circle
            id="Ellipse_4"
            dataName="Ellipse 4"
            cx="2.396"
            cy="2.396"
            r="2.396"
            transform="translate(81.355 22.999)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
          />
          <Path
            id="Path_81"
            dataName="Path 81"
            d="M80.089,15.4h-.046a.923.923,0,0,0-.231.6v.139a.807.807,0,0,0,.231.417.7.7,0,0,0,.555.278A.87.87,0,0,0,81.432,16a.923.923,0,0,0-.231-.6.816.816,0,0,0-.6-.231A.61.61,0,0,0,80.089,15.4Z"
            transform="translate(-1.194 -1.003)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_82"
            dataName="Path 82"
            d="M89.946,15.349a.618.618,0,0,0-.555-.185l-.046-.046a.965.965,0,0,0-.557.277l-.092.092a.837.837,0,0,0-.14.416.695.695,0,0,0,.834.833.621.621,0,0,0,.555-.185.81.81,0,0,0,.231-.6A.8.8,0,0,0,89.946,15.349Z"
            transform="translate(-1.194 -1.003)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_83"
            dataName="Path 83"
            d="M95.362,21.319a.8.8,0,0,0-.417.232.7.7,0,0,0-.277.555.747.747,0,0,0,.277.6.757.757,0,0,0,.555.231.924.924,0,0,0,.6-.231.819.819,0,0,0,.231-.6A.619.619,0,0,0,96.1,21.6v-.046a.925.925,0,0,0-.6-.232Z"
            transform="translate(-1.194 -1.003)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_84"
            dataName="Path 84"
            d="M96.01,30.2a.815.815,0,0,0-.417-.139.693.693,0,0,0-.833.832.617.617,0,0,0,.186.555.9.9,0,0,0,1.2,0,.626.626,0,0,0,.186-.555l.046-.045A.962.962,0,0,0,96.1,30.3C96.071,30.266,96.041,30.234,96.01,30.2Z"
            transform="translate(-1.194 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_85"
            dataName="Path 85"
            d="M88.558,37.008a.938.938,0,0,0,.231.6.816.816,0,0,0,.6.23.614.614,0,0,0,.509-.23h.046a.922.922,0,0,0,.231-.6v-.139a.794.794,0,0,0-.231-.416.7.7,0,0,0-.555-.277.751.751,0,0,0-.6.277A.763.763,0,0,0,88.558,37.008Z"
            transform="translate(-1.194 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_86"
            dataName="Path 86"
            d="M74.49,21.366a.815.815,0,0,0-.6.231.626.626,0,0,0-.187.555l-.046.047a.97.97,0,0,0,.278.556c.03.03.061.062.094.092a.813.813,0,0,0,.415.139.694.694,0,0,0,.833-.833.618.618,0,0,0-.186-.555A.8.8,0,0,0,74.49,21.366Z"
            transform="translate(-1.194 -1.003)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_87"
            dataName="Path 87"
            d="M81.432,37.1a.695.695,0,0,0-.834-.834.621.621,0,0,0-.555.186.9.9,0,0,0,0,1.2.618.618,0,0,0,.555.186l.047.047a.96.96,0,0,0,.556-.277c.03-.031.062-.062.093-.092A.864.864,0,0,0,81.432,37.1Z"
            transform="translate(-1.194 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_88"
            dataName="Path 88"
            d="M73.656,30.9a.615.615,0,0,0,.232.51v.045a.922.922,0,0,0,.6.232h.138a.8.8,0,0,0,.417-.232.7.7,0,0,0,.277-.555.866.866,0,0,0-.832-.832.92.92,0,0,0-.6.23A.815.815,0,0,0,73.656,30.9Z"
            transform="translate(-1.194 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_89"
            dataName="Path 89"
            d="M36.865,25.678a.815.815,0,0,0-.6.231.625.625,0,0,0-.187.555l-.046.047a.964.964,0,0,0,.278.555c.03.031.061.062.094.092a.8.8,0,0,0,.415.139.694.694,0,0,0,.833-.833.617.617,0,0,0-.186-.555A.8.8,0,0,0,36.865,25.678Z"
            transform="translate(-1.193 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_90"
            dataName="Path 90"
            d="M56.865,25.678a.815.815,0,0,0-.6.231.625.625,0,0,0-.187.555l-.046.047a.964.964,0,0,0,.278.555c.03.031.061.062.094.092a.8.8,0,0,0,.415.139.694.694,0,0,0,.833-.833.617.617,0,0,0-.186-.555A.8.8,0,0,0,56.865,25.678Z"
            transform="translate(-1.193 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_91"
            dataName="Path 91"
            d="M18.7,13.345a.815.815,0,0,0-.6.231.626.626,0,0,0-.187.555l-.046.047a.97.97,0,0,0,.278.556c.03.03.061.062.094.092a.813.813,0,0,0,.415.139.694.694,0,0,0,.833-.833.618.618,0,0,0-.186-.555A.8.8,0,0,0,18.7,13.345Z"
            transform="translate(-1.192 -1.003)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_92"
            dataName="Path 92"
            d="M106.115,8.011a.815.815,0,0,0-.6.231.626.626,0,0,0-.187.555l-.046.047a.97.97,0,0,0,.278.556c.03.03.061.062.094.092a.813.813,0,0,0,.415.139A.694.694,0,0,0,106.9,8.8a.618.618,0,0,0-.186-.555A.8.8,0,0,0,106.115,8.011Z"
            transform="translate(-1.195 -1.003)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_93"
            dataName="Path 93"
            d="M106.115,43.178a.814.814,0,0,0-.6.23.626.626,0,0,0-.187.555l-.046.047a.97.97,0,0,0,.278.557c.03.029.061.061.094.092a.822.822,0,0,0,.415.139.7.7,0,0,0,.833-.834.618.618,0,0,0-.186-.555A.8.8,0,0,0,106.115,43.178Z"
            transform="translate(-1.195 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_94"
            dataName="Path 94"
            d="M18.7,37.928a.814.814,0,0,0-.6.23.626.626,0,0,0-.187.555l-.046.047a.97.97,0,0,0,.278.557c.03.029.061.061.094.092a.822.822,0,0,0,.415.139.7.7,0,0,0,.833-.834.618.618,0,0,0-.186-.555A.8.8,0,0,0,18.7,37.928Z"
            transform="translate(-1.192 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_95"
            dataName="Path 95"
            d="M44.323,13.345a.815.815,0,0,0-.6.231.626.626,0,0,0-.187.555l-.046.047a.97.97,0,0,0,.278.556c.03.03.061.062.094.092a.813.813,0,0,0,.415.139.694.694,0,0,0,.833-.833.618.618,0,0,0-.186-.555A.8.8,0,0,0,44.323,13.345Z"
            transform="translate(-1.193 -1.003)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_96"
            dataName="Path 96"
            d="M44.323,37.928a.814.814,0,0,0-.6.23.626.626,0,0,0-.187.555l-.046.047a.97.97,0,0,0,.278.557c.03.029.061.061.094.092a.822.822,0,0,0,.415.139.7.7,0,0,0,.833-.834.618.618,0,0,0-.186-.555A.8.8,0,0,0,44.323,37.928Z"
            transform="translate(-1.193 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_97"
            dataName="Path 97"
            d="M22.693,25.076a.979.979,0,0,0-.725.278.754.754,0,0,0-.224.668l-.055.057a1.167,1.167,0,0,0,.334.668c.037.035.073.073.112.109a.992.992,0,0,0,.5.167.835.835,0,0,0,1-1,.743.743,0,0,0-.224-.668A.962.962,0,0,0,22.693,25.076Z"
            transform="translate(-1.192 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_98"
            dataName="Path 98"
            d="M55.959,21.709a.815.815,0,0,0-.6.231.626.626,0,0,0-.187.555l-.046.047a.97.97,0,0,0,.278.556c.03.03.061.062.094.092a.813.813,0,0,0,.415.139.694.694,0,0,0,.833-.833.618.618,0,0,0-.186-.555A.8.8,0,0,0,55.959,21.709Z"
            transform="translate(-1.193 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
          <Path
            id="Path_99"
            dataName="Path 99"
            d="M55.959,29.709a.814.814,0,0,0-.6.23.628.628,0,0,0-.187.557l-.046.047a.97.97,0,0,0,.278.555c.03.031.061.062.094.092a.8.8,0,0,0,.415.139.693.693,0,0,0,.833-.832.62.62,0,0,0-.186-.557A.8.8,0,0,0,55.959,29.709Z"
            transform="translate(-1.193 -1.004)"
            fill="none"
            stroke="#6ee7b7"
            strokeMiterlimit="10"
            strokeWidth="0.75"
            fillRule="evenodd"
          />
        </G>
      </G>
    </Svg>
  );
};

export default SuraHeader;
