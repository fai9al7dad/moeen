import { Box, Text, ZStack } from "native-base";
import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { quranArray } from "../../../types/quran.types";
import { RFValue } from "../../../utils/RFValue";
import SuraHeader from "../../svg/SuraHeader";
import Word from "./Word";

const RenderWords: React.FC<quranArray> = React.memo(
  (props) => {
    const { data } = props;
    const { width } = Dimensions.get("window");
    return (
      <Text
        fontFamily={`p${data[0]?.pageNumber}`}
        fontSize={RFValue(19)}
        lineHeight={RFValue(38)}
        textAlign="center"
        // shadow={1}
        style={styles.customShadow}
      >
        {data.map((item, index) => {
          let curLineNum = data[index]?.lineNumber;
          // if last item this will return undefined
          let aftLineNum = data[index + 1]?.lineNumber;
          let lineChange = curLineNum !== aftLineNum;
          if (lineChange) {
            if (item.charType === "end") {
              return (
                <>
                  <Text
                    key={item.wordID}
                    shadow={0}
                    fontSize={"25"}
                    color="tertiary.600"
                  >
                    {item.text}
                  </Text>
                  {"\n"}
                </>
              );
            }
            if (item.isNewChapter) {
              if (item.isBismillah && item.pageNumber !== 187) {
                let condition = item.lineNumber === 1;
                return (
                  <>
                    <Text
                      key={item.wordID}
                      fontSize={condition ? "3xl" : "2xl"}
                      textAlign="center"
                    >
                      <Box
                        width={condition ? width * 0.26 : width * 0.3}
                        height={5}
                      ></Box>
                      <Text>﷽</Text>
                      {"\n"}
                      {condition ? (
                        <Box
                          width={condition ? width * 0.26 : width * 0.3}
                          height={4}
                        ></Box>
                      ) : null}
                    </Text>
                  </>
                );
              }

              return (
                <>
                  <SuraHeader
                    key={item.wordID}
                    chapterCode={item.chapterCode}
                  />
                  {"\n"}
                </>
              );
            }
            return (
              <>
                <Word
                  isStartOfLine={false}
                  key={item.wordID}
                  text={item.text}
                  color={item.color}
                  id={item.wordID}
                  index={index}
                  pageNumber={data[0]?.pageNumber}
                />
                {"\n"}
              </>
            );
          }
          // if not line change
          if (item.charType === "end") {
            return (
              <>
                <Text key={item.wordID} color="tertiary.600" fontSize={"25"}>
                  {item.text}
                </Text>
              </>
            );
          }
          return (
            <Word
              isStartOfLine={true}
              key={item.wordID}
              text={item.text}
              color={item.color}
              id={item.wordID}
              index={index}
              pageNumber={data[0]?.pageNumber}
            />
          );
        })}
      </Text>
    );
  },
  (p, n) => {
    return p.data[0].pageNumber === n.data[0].pageNumber;
  }
);
export default RenderWords;

const styles = StyleSheet.create({
  customShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 0.2,
    elevation: 2,
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
