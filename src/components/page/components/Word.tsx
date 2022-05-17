import React, { SetStateAction, useContext, useState } from "react";
import { Box, Text, Stagger } from "native-base";
import { mistakesColor } from "../../../assets/conts/mistakes";
import { selectionAsync } from "expo-haptics";
import { updateWordColor } from "../../../utils/sqlite/updateWordColor";

interface props {
  color: string;
  text: string;
  id: number;
  incrementMistake: () => void;
  incrementWarning: () => void;
  decrementMistake: () => void;
  decrementWarning: () => void;
}
const Word: React.FC<props> = React.memo(
  ({
    color,
    text,
    id,
    incrementMistake,
    incrementWarning,
    decrementWarning,
    decrementMistake,
  }) => {
    const [wordColor, setWordColor] = useState(color ? color : "black");
    const [showToolTip, setShowToolTip] = useState(false);
    const [showStagger, setShowStagger] = useState(false);

    const highlightWord = async (wordID: number) => {
      // haptics feedback
      selectionAsync();

      // const word = await getRowById("word", wordID);
      // setTimeout(() => {
      //   setRefreshCounter(refreshCounter + 1);
      // }, 2000);
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
          break;
        case mistakesColor.warning:
          newColor = mistakesColor.mistake;
          break;
        case mistakesColor.mistake:
          newColor = mistakesColor.default;
          break;
      }
      setWordColor(newColor);

      updateWordColor(newColor, wordID);
      if (newColor === mistakesColor.warning) {
        incrementWarning();
      }
      if (newColor === mistakesColor.mistake) {
        decrementWarning();
        incrementMistake();
      }
      if (newColor === mistakesColor.default) {
        decrementMistake();
      }
      // setRefreshCounter(refreshCounter + 1);
    };

    return (
      <Text
        // onPress={() => highlightWord(id)}
        onPress={() => highlightWord(id)}
        color={wordColor}
        suppressHighlighting
      >
        {showStagger ? (
          <Stagger
            visible={showToolTip}
            initial={{
              opacity: 0,
              scale: 0,

              translateY: 10,
            }}
            animate={{
              translateY: 0,
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
              position="absolute"
              // right={}
              bg={
                wordColor === mistakesColor.warning ? "amber.500" : "danger.500"
              }
              width={12}
              height={7}
              // zIndex="2xl"
              justifyContent="center"
              alignItems="center"
              rounded="sm"
              borderWidth={1}
              borderColor={
                wordColor === mistakesColor.warning ? "amber.400" : "danger.400"
              }
              top={-70}
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
        ) : null}

        {text}
      </Text>
    );
  }
);

export default Word;
