import React, { createContext, useCallback, useState } from "react";
import { Box, Pressable, Text } from "native-base";
import PageHeader from "./PageHeader";
import SuraHeader from "../svg/SuraHeader";
import Word from "./components/Word";
const PageContext = createContext<any>(null);

const RenderPage: React.FC<any> = React.memo(
  ({ data, width, height }) => {
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
          mistakesCount={mistakesCount}
          warningsCount={warningsCount}
        />

        <Box height={"88%"} justifyContent="center" alignItems={"center"}>
          <Text
            fontFamily={`p${data[0]?.pageNumber}`}
            fontSize={"4.9em"}
            lineHeight={47}
            textAlign="center"
            adjustsFontSizeToFit
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
    return p.data[0].pageID === n.data[0].pageID;
  }
);
export default RenderPage;
// class RenderPage extends PureComponent {
//   render() {
//     const { type, data, width, height, showFooter } = this.props;
//     // let rubNumber = (currentPage) => {
//     //   let count = currentPage / 20;
//     //   if (count <= 0.25) {
//     //     return 1;
//     //   } else if (count <= 0.5) {
//     //     return 2;
//     //   } else if (count <= 0.75) {
//     //     return 3;
//     //   } else if (count <= 1) {
//     //     return 4;
//     //   }
//     // };
//     // let filteredPages = [569];

//     return (
//       <Pressable
//         height={height}
//         width={width}
//         // justifyContent="center"
//         // alignItems={"center"}
//         onLongPress={() => {
//           showFooter(true);
//         }}
//       >
//         <PageHeader data={data} />
//         <Box height={"88%"} justifyContent="center" alignItems={"center"}>
//           <Text
//             fontFamily={`p${data[0]?.pageNumber}`}
//             fontSize={24}
//             lineHeight={47}
//             textAlign="center"
//             fontWeight={900}
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
//                       <Text fontSize={"25"} color="#865520">
//                         {item.text}
//                       </Text>
//                       {"\n"}
//                     </>
//                   );
//                 }
//                 if (item.isNewChapter) {
//                   if (item.isBismillah) {
//                     return (
//                       <>
//                         <Text
//                           key={item.id}
//                           fontSize="2xl"
//                           // bg={"red.100"}
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
//                       <SuraHeader chapterCode={item.chapterCode} />
//                       {"\n"}
//                     </>
//                   );
//                 }
//                 return (
//                   <>
//                     <Word
//                       key={item.id}
//                       text={item.text}
//                       color={item.color}
//                       id={item.id}
//                     />
//                     {"\n"}
//                     {/* <Text key={item.id}>{item.text}</Text> */}
//                   </>
//                 );
//               }
//               if (item.charType === "end") {
//                 return (
//                   <>
//                     <Text color="#865520" fontSize={"25"}>
//                       {item.text}
//                     </Text>
//                   </>
//                 );
//               }
//               return (
//                 <Word
//                   key={item.id}
//                   text={item.text}
//                   color={item.color}
//                   id={item.id}
//                 />
//               );
//             })}
//           </Text>
//         </Box>

//         <PageFooter data={data} />
//       </Pressable>
//     );
//   }
// }

// export default RenderPage;
