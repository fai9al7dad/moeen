import React, { useCallback, useContext, useState } from "react";
import { Box, Text, Stagger, Pressable } from "native-base";
import { mistakesColor } from "../../../assets/conts/mistakes";
import { selectionAsync } from "expo-haptics";
import { updateWordColor } from "../../../utils/sqlite/updateWordColor";
import { QuranDataContext } from "../../../contexts/QuranDataContext";
import { getRowById } from "../../../utils/sqlite/getRowById";
import quran from "../../../stores/Quran";
import store from "../../../stores/Store";
import { Dimensions, Platform, StyleSheet } from "react-native";
import { RFValue } from "../../../utils/RFValue";
import colorsModel from "../../../utils/sqlite/model/colorsModel";

interface props {
  // color: string;
  text: string;
  id: number;
  index: number;
  lineNumber: number;
  pageNumber: number;
  isStartOfLine: boolean;
  chapterCode: string;
}
const Word: React.FC<props> = React.memo(
  ({
    // color,
    text,
    id,
    index,
    pageNumber,
    lineNumber,
    isStartOfLine,
    chapterCode,
  }) => {
    let found;
    if (!store.isWerd) {
      found = quran.wordsColorsMistakes.find((e: any) => e.wordID === id);
    }
    const [wordColor, setWordColor] = useState(
      found?.color ? found?.color : "black"
    );
    const [showToolTip, setShowToolTip] = useState(false);
    const [showStagger, setShowStagger] = useState(false);
    const highlightWord = async (wordID: number) => {
      // haptics feedback

      selectionAsync();
      if (wordColor !== mistakesColor.mistake) {
        // show stagger is required because initily stagger should be null to not mess up text layout
        setShowStagger(true);
        setShowToolTip(true);
        setTimeout(() => {
          setShowToolTip(false);
        }, 1000);
        setTimeout(() => {
          setShowStagger(false);
        }, 1200);
      }
      let newColor;
      switch (wordColor) {
        case mistakesColor.default:
          newColor = mistakesColor.warning;
          quran.updateMistakesCounter(
            pageNumber,
            "warning",
            wordID,
            index,
            lineNumber,
            newColor
          );
          if (store.isWerd) {
            store.updateMistakesOrWarningsCounter("warning", wordID);
          }

          break;
        case mistakesColor.warning:
          newColor = mistakesColor.mistake;
          quran.updateMistakesCounter(
            pageNumber,
            "mistake",
            wordID,
            index,
            lineNumber,

            newColor
          );
          if (store.isWerd) {
            store.updateMistakesOrWarningsCounter("mistake", wordID);
          }
          break;
        case mistakesColor.mistake:
          newColor = mistakesColor.default;
          quran.updateMistakesCounter(
            pageNumber,
            "revert",
            wordID,
            index,
            lineNumber,

            newColor
          );

          if (store.isWerd) {
            store.updateMistakesOrWarningsCounter("revert", wordID);
          }
          break;
      }
      // dont know if required, just thought it will optimize performance
      setTimeout(() => {
        if (!store.isWerd) {
          // updateWordColor(newColor, wordID);
          colorsModel.insertColor({
            wordID: wordID,
            color: newColor,
            chapterCode: chapterCode,
            pageNumber: pageNumber,
          });
        }
      }, 500);
      setWordColor(newColor);
    };

    return (
      <>
        <Text
          color={wordColor}
          onPress={() => highlightWord(id)}
          suppressHighlighting
          zIndex={1}
          // lineHeight={RFValue(39.5)}
        >
          {text}
        </Text>
        {showStagger ? (
          <Box>
            {/* required or else stagger wont render */}
            {Platform.OS === "android" ? <Text fontSize={0.01}>s</Text> : null}

            <Stagger
              visible={showToolTip}
              initial={{
                opacity: 0,
                scale: 0,
                translateY: 10,
              }}
              animate={{
                translateY: 0,
                translateX: Platform.OS === "android" ? 30 : 0,
                scale: 1,
                opacity: 1,
                transition: {
                  type: "spring",
                  mass: 0.2,
                  stagger: {
                    offset: 5,
                    reverse: true,
                  },
                },
              }}
              exit={{
                translateY: 34,
                scale: 0.5,
                opacity: 0,
                transition: {
                  duration: 100,
                  stagger: {
                    offset: 30,
                    reverse: true,
                  },
                },
              }}
            >
              <Box
                bg={
                  wordColor === mistakesColor.warning
                    ? "amber.500"
                    : "danger.500"
                }
                width={12}
                flex={1}
                zIndex={999}
                height={7}
                position="absolute"
                justifyContent="center"
                alignItems="center"
                rounded="sm"
                borderWidth={1}
                borderColor={
                  wordColor === mistakesColor.warning
                    ? "amber.400"
                    : "danger.400"
                }
                left={-40}
                top={-60}
              >
                <Text
                  fontSize="10"
                  fontFamily={"montserrat-bold"}
                  color={
                    wordColor === mistakesColor.warning
                      ? "amber.200"
                      : "danger.200"
                  }
                >
                  {wordColor === mistakesColor.warning ? "تنبيه" : "خطأ"}
                </Text>
              </Box>
            </Stagger>
          </Box>
        ) : null}
      </>
    );
  }
);

export default Word;
