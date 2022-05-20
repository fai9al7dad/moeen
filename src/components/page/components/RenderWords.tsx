import { Box, Text, ZStack } from "native-base";
import React from "react";
import { Dimensions } from "react-native";
import { RFValue } from "../../../utils/RFValue";
import SuraHeader from "../../svg/SuraHeader";
import Word from "./Word";

const RenderWords = React.memo(
  ({ data }) => {
    const { width } = Dimensions.get("window");
    return (
      <Text
        fontFamily={`p${data[0]?.pageNumber}`}
        fontSize={RFValue(19)}
        lineHeight={RFValue(40)}
        textAlign="center"
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
                  <Text key={item.wordID} fontSize={"25"} color="#865520">
                    {item.text}
                  </Text>
                  {"\n"}
                </>
              );
            }
            if (item.isNewChapter) {
              if (item.isBismillah && item.pageNumber !== 187) {
                return (
                  <>
                    <Text key={item.wordID} fontSize="2xl" textAlign="center">
                      <Box width={width * 0.3} height={5}></Box>
                      <Text>﷽</Text>
                      {"\n"}
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
                <Text key={item.wordID} color="#865520" fontSize={"25"}>
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
