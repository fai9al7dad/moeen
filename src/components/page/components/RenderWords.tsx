import { Box, Text, ZStack } from "native-base";
import React, { useEffect, useRef } from "react";
import { Dimensions, Platform, StyleSheet } from "react-native";
import quran from "../../../stores/Quran";
import { quranArray } from "../../../types/quran.types";
import { RFValue } from "../../../utils/RFValue";
import SuraHeader from "../../svg/SuraHeader";
import Word from "./Word";

{
  /* <Text
          fontFamily={`p${data[0]?.pageNumber}`}
          fontSize={RFValue(19)}
          lineHeight={RFValue(38)}
          textAlign="center"
          color="tertiary.600"
          // shadow={1}
          style={styles.customShadow}
        ></Text> */
}
const RenderWords: React.FC<any> = React.memo(
  (props) => {
    const { data } = props;
    const { width, height } = Dimensions.get("window");
    let isIos = Platform.OS === "ios";

    return (
      <Box
        flexDirection={"row"}
        flexWrap="wrap"
        width={width}
        justifyContent="center"
        alignItems={"center"}
      >
        {data.lines.map((line) => {
          return (
            <Box
              flexDirection="row"
              justifyContent="center"
              alignItems={"center"}
              w={"100%"}
            >
              <Text
                fontFamily={"p" + data.id} // this line causes leak
                fontSize={isIos ? RFValue(19) : RFValue(20)}
                px={0.5}
                allowFontScaling={false}
                // pt={!line.words[0].isNewChapter ? "3" : "0"}
                lineHeight={RFValue(39)}
                style={isIos ? styles.customShadow : {}}
              >
                {line.words.map((word, index) => {
                  if (word.isBismillah && line.pageID !== 187) {
                    return (
                      <Text
                        fontFamily={"p1"}
                        fontSize="2xl"
                        lineHeight={RFValue(41)}
                      >
                        ﱁﱂﱃﱄ
                      </Text>
                    );
                  }
                  if (word.isNewChapter) {
                    return (
                      <SuraHeader
                        key={word.id}
                        chapterCode={word.chapterCode}
                      />
                    );
                  }
                  if (word.charType === "end") {
                    return (
                      <>
                        <Text
                          key={word.id}
                          color="tertiary.600"
                          fontSize={"25"}
                          fontFamily={`p${line?.pageID}`}
                        >
                          {word.text}
                        </Text>
                      </>
                    );
                  }

                  return (
                    <Word
                      isStartOfLine={index === line.words.length - 1}
                      key={word.id}
                      id={word.id}
                      text={word.text}
                      index={index}
                      lineNumber={word?.lineNumber}
                      pageNumber={line?.pageID}
                      chapterCode={word?.chapterCode}
                      // color={found ? found.color : word.color} // if found get color from db, else get default
                    />
                  );
                })}
              </Text>
            </Box>
          );
        })}
      </Box>
    );
  },
  (p, n) => {
    return p.data.id === n.data.id;
  }
);
export default RenderWords;

const styles = StyleSheet.create({
  customShadow: {
    textShadowColor: "#000",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 0.4,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 0,
    // },
    // shadowOpacity: 1,
    // shadowRadius: 0.2,
    // elevation: 2,
  },
});

// if (lineChange) {
//   if (item.charType === "end") {
//     return (
//       <>
//         <Text key={item.wordID} fontSize={"25"} color="#865520">
//           {item.text}
//         </Text>
//         {"\n"}
//       </>
//     );
//   }
//   if (item.isNewChapter) {
//     if (item.isBismillah && item.pageNumber !== 187) {
//       return (
//         <>
//           <Text key={item.wordID} fontSize="2xl" textAlign="center">
//             <Box width={width * 0.3} height={5}></Box>
//             <Text>﷽</Text>
//             {"\n"}
//           </Text>
//         </>
//       );
//     }
//     return (
//       <>
//         <SuraHeader
//           key={item.wordID}
//           chapterCode={item.chapterCode}
//         />
//         {"\n"}
//       </>
//     );
//   }
//   return (
//     <>
//       <Word
//         key={item.wordID}
//         text={item.text}
//         color={item.color}
//         id={item.wordID}
//         index={index}
//         pageNumber={data[0]?.pageNumber}
//       />
//       {"\n"}
//     </>
//   );
// }
