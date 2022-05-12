import React, { PureComponent } from "react";
import { Box, HStack, Image, Pressable, Text, VStack } from "native-base";
import PageHeader from "./PageHeader";
import SuraHeader from "../svg/SuraHeader";
import PageFooter from "./PageFooter";
import Word from "./components/Word";
const RenderPage = ({ data, width, height, scrollFunc, navigation }) => {
  return (
    <Box height={height} width={width}>
      <PageHeader
        data={data}
        scrollTo={(index: number) => scrollFunc(index)}
        navigation={navigation}
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
                    <Text fontSize={"25"} color="#865520">
                      {item.text}
                    </Text>
                    {"\n"}
                  </>
                );
              }
              if (item.isNewChapter) {
                if (item.isBismillah) {
                  return (
                    <>
                      <Text key={item.id} fontSize="2xl" textAlign="center">
                        <Box width={width * 0.3} height={5}></Box>
                        <Text>﷽</Text>

                        {"\n"}
                      </Text>
                    </>
                  );
                }
                return (
                  <>
                    <SuraHeader chapterCode={item.chapterCode} />
                    {"\n"}
                  </>
                );
              }
              return (
                <>
                  <Word
                    key={item.id}
                    text={item.text}
                    color={item.color}
                    id={item.id}
                  />
                  {"\n"}
                </>
              );
            }
            if (item.charType === "end") {
              return (
                <>
                  <Text color="#865520" fontSize={"25"}>
                    {item.text}
                  </Text>
                </>
              );
            }
            return (
              <Word
                key={item.id}
                text={item.text}
                color={item.color}
                id={item.id}
              />
            );
          })}
        </Text>
      </Box>
    </Box>
  );
};

export default React.memo(RenderPage);
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
