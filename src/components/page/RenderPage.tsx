import React, { createContext, useCallback, useContext, useState } from "react";
import { Box, Pressable, Text } from "native-base";
import PageHeader from "./PageHeader";
import SuraHeader from "../svg/SuraHeader";
import Word from "./components/Word";
import { QuranDataContext } from "../../contexts/QuranDataContext";
import { DataProvider } from "recyclerlistview";
import { RFValue } from "../../utils/RFValue";

const RenderPage: React.FC<any> = React.memo(
  ({ data, width, height, scrollFunc }) => {
    const [mistakesCount, setMistakesCount] = useState(
      data[0]?.mistakes ? data[0]?.mistakes : null
    );
    const [warningsCount, setWarningsCount] = useState(
      data[0]?.warnings ? data[0]?.warnings : null
    );

    const incrementWarning = useCallback(() => {
      setWarningsCount(warningsCount + 1);
    }, [warningsCount]);
    const decrementWarning = useCallback(() => {
      setWarningsCount(warningsCount - 1);
    }, [warningsCount]);

    const incrementMistake = useCallback(() => {
      setMistakesCount(mistakesCount + 1);
    }, [mistakesCount]);
    const decrementMistake = useCallback(() => {
      setMistakesCount(mistakesCount - 1);
    }, [mistakesCount]);

    return (
      <Box height={height} width={width}>
        <PageHeader
          data={data[0]}
          scrollFunc={scrollFunc}
          mistakesCount={mistakesCount}
          warningsCount={warningsCount}
        />

        <Box height={"88%"} justifyContent="center" alignItems={"center"}>
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
                        <Text
                          key={item.wordID}
                          fontSize="2xl"
                          textAlign="center"
                        >
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
                      key={item.wordID}
                      text={item.text}
                      color={item.color}
                      id={item.wordID}
                      incrementMistake={incrementMistake}
                      incrementWarning={incrementWarning}
                      decrementMistake={decrementMistake}
                      decrementWarning={decrementWarning}
                    />
                    {"\n"}
                  </>
                );
              }
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
                  key={item.wordID}
                  text={item.text}
                  color={item.color}
                  id={item.wordID}
                  incrementMistake={incrementMistake}
                  incrementWarning={incrementWarning}
                  decrementWarning={decrementWarning}
                  decrementMistake={decrementMistake}
                />
              );
            })}
          </Text>
        </Box>
      </Box>
    );
  },
  (p, n) => {
    return p.data[0].pageNumber === n.data[0].pageNumber;
  }
);
export default RenderPage;
//  <Box height={height} width={width}>
//         <PageHeader
//           data={data[0]}
//           scrollFunc={scrollFunc}
//           mistakesCount={mistakesCount}
//           warningsCount={warningsCount}
//         />

//         <Box height={"88%"} justifyContent="center" alignItems={"center"}>
//           <Text
//             fontFamily={`p${data[0]?.pageNumber}`}
//             fontSize={RFValue(19)}
//             lineHeight={RFValue(40)}
//             textAlign="center"

//           >
//             {data.map((item, index) => {
//               let curLineNum = data[index]?.lineNumber;
//               // if last item this will return undefined
//               let aftLineNum = data[index + 1]?.lineNumber;
//               let lineChange = curLineNum !== aftLineNum;

//               if (lineChange) {
//                 if (item.charType === "end") {
//                   return (
//                     <>
//                       <Text key={item.wordID} fontSize={"25"} color="#865520">
//                         {item.text}
//                       </Text>
//                       {"\n"}
//                     </>
//                   );
//                 }
//                 if (item.isNewChapter) {
//                   if (item.isBismillah && item.pageNumber !== 187) {
//                     return (
//                       <>
//                         <Text
//                           key={item.wordID}
//                           fontSize="2xl"
//                           textAlign="center"
//                         >
//                           <Box width={width * 0.3} height={5}></Box>
//                           <Text>﷽</Text>

//                           {"\n"}
//                         </Text>
//                       </>
//                     );
//                   }
//                   return (
//                     <>
//                       <SuraHeader
//                         key={item.wordID}
//                         chapterCode={item.chapterCode}
//                       />
//                       {"\n"}
//                     </>
//                   );
//                 }
//                 return (
//                   <>
//                     <Word
//                       key={item.wordID}
//                       text={item.text}
//                       color={item.color}
//                       id={item.wordID}
//                       incrementMistake={incrementMistake}
//                       incrementWarning={incrementWarning}
//                       decrementMistake={decrementMistake}
//                       decrementWarning={decrementWarning}
//                     />
//                     {"\n"}
//                   </>
//                 );
//               }
//               if (item.charType === "end") {
//                 return (
//                   <>
//                     <Text key={item.wordID} color="#865520" fontSize={"25"}>
//                       {item.text}
//                     </Text>
//                   </>
//                 );
//               }
//               return (
//                 <Word
//                   key={item.wordID}
//                   text={item.text}
//                   color={item.color}
//                   id={item.wordID}
//                   incrementMistake={incrementMistake}
//                   incrementWarning={incrementWarning}
//                   decrementWarning={decrementWarning}
//                   decrementMistake={decrementMistake}
//                 />
//               );
//             })}
