import { Box, Text } from "native-base";
import React from "react";
import { Dimensions } from "react-native";
import { WordType } from "../../../assets/types";
import { RFValue } from "../../../utils/RFValue";
import SuraHeader from "../../svg/SuraHeader";
import Word from "./Word";

interface props extends WordType {
  pageID: number;
  index: number;
}
const LineWords: React.FC<props> = React.memo(
  ({
    id,
    color,
    text,
    lineID,
    lineNumber,
    audioUrl,
    chapterCode,
    isNewChapter,
    isBismillah,
    transliteration,
    charType,
    verseNumber,
    pageID,
    index,
  }) => {
    const { width } = Dimensions.get("window");
    if (isBismillah) {
      return (
        <Text fontFamily={"p1"} fontSize="2xl">
          ﱁﱂﱃﱄ
        </Text>
      );
    }
    if (isNewChapter) {
      return (
        <Box
          px={2}
          // bg="red.100"
          w={width}
          justifyContent="center"
          alignItems={"center"}
        >
          <SuraHeader key={id} chapterCode={chapterCode} />
        </Box>
      );
    }
    if (charType === "end") {
      // ayah number
      return <Text color="tertiary.600">{text}</Text>;
    }
    return (
      <Word
        // isStartOfLine={index === length - 1}
        id={id}
        color={color}
        text={text}
        verseNumber={verseNumber}
        index={index}
        lineNumber={lineNumber}
        pageNumber={pageID}
        chapterCode={chapterCode}
        // color={found ? found.color : word.color} // if found get color from db, else get default
      />
    );
  },
  (p, n) => {
    return p.id === n.id;
  }
);

export default LineWords;
