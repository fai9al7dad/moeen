import React, { useState } from "react";
import { Box, Text, Stagger } from "native-base";
import * as SQLite from "expo-sqlite";
import { mistakesColor, mistakeTypes } from "../../../assets/conts/mistakes";
import { selectionAsync } from "expo-haptics";

interface props {
  color: string;
  text: string;
  id: number;
}
const Word: React.FC<props> = ({ color, text, id }) => {
  let wordText = text;
  const [wordColor, setWordColor] = useState(color);
  const [showToolTip, setShowToolTip] = useState(false);
  const [showStagger, setShowStagger] = useState(false);
  const highlightWord = (wordID: number) => {
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
    switch (wordColor) {
      case mistakesColor.default:
        setWordColor(mistakesColor.warning);
        break;
      case mistakesColor.warning:
        setWordColor(mistakesColor.mistake);
        break;
      case mistakesColor.mistake:
        setWordColor(mistakesColor.default);
        break;
    }
    // haptics feedback
    selectionAsync();

    const db = SQLite.openDatabase("quran.db");
    db.transaction((tx) => {
      let updateWordColor = `UPDATE word set color = ? where id = ?`;
      tx.executeSql(
        updateWordColor,
        [wordColor, wordID],
        (_, s) => {
          // console.log(rows);
          // console.log("finished query");
        },
        (t: any, e: any) => {
          console.log("error from updating", e);
        }
      );
    });
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
            bg={
              wordColor === mistakesColor.warning ? "amber.500" : "danger.500"
            }
            width={12}
            height={7}
            zIndex="20"
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
                wordColor === mistakesColor.warning ? "amber.200" : "danger.200"
              }
            >
              {wordColor === mistakesColor.warning ? "تنبيه" : "خطأ"}
            </Text>
          </Box>
        </Stagger>
      ) : null}

      {wordText}
    </Text>
  );
};

export default Word;
