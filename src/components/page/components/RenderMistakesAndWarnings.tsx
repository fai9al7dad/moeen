import React from "react";
import { Box, Text } from "native-base";
import { inject, observer } from "mobx-react";
import { mistakesColor } from "../../../assets/conts/mistakes";
import store from "../../../stores/Store";

interface props {
  quran?: any;
  textColor: string;
  pageNumber: number;
}
const RenderMistakesAndWarnings: React.FC<props> = ({
  quran,
  textColor,
  pageNumber,
}) => {
  let curDataFromStore = quran.quranData[pageNumber - 1];

  return (
    <Box flexDirection="row" alignItems="center">
      <Box display={"none"}>
        <Text>{quran.counter}</Text>
      </Box>
      <Box flexDirection="row" alignItems="center" mr="2">
        {curDataFromStore.warnings > 0 ? (
          <>
            <Box
              backgroundColor={mistakesColor.warning}
              width="2"
              height="2"
              mr="0.5"
              rounded="full"
            />
            <Box>
              <Text
                fontSize={"xs"}
                fontWeight="bold"
                color={textColor}
                allowFontScaling={false}
              >
                {curDataFromStore.warnings}
              </Text>
            </Box>
          </>
        ) : null}
      </Box>
      <Box flexDirection="row" alignItems="center" mr="2">
        {curDataFromStore.mistakes > 0 ? (
          <>
            <Box
              backgroundColor={mistakesColor.mistake}
              width="2"
              height="2"
              mr="0.5"
              rounded="full"
            />
            <Box>
              <Text
                fontSize={"xs"}
                fontWeight="bold"
                color={textColor}
                allowFontScaling={false}
              >
                {curDataFromStore.mistakes}
              </Text>
            </Box>
          </>
        ) : null}
      </Box>
    </Box>
  );
};

export default inject("quran")(observer(RenderMistakesAndWarnings));
