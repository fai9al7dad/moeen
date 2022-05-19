import React from "react";
import { Box, Text } from "native-base";
import PageHeader from "./PageHeader";
import SuraHeader from "../svg/SuraHeader";
import Word from "./components/Word";
import { RFValue } from "../../utils/RFValue";
import RenderWords from "./components/RenderWords";

const RenderPage: React.FC<any> = React.memo(({ data, width, height }) => {
  return (
    <Box height={height} width={width}>
      <PageHeader data={data} />
      <Box height={"88%"} justifyContent="center" alignItems={"center"}>
        <RenderWords data={data} />
      </Box>
    </Box>
  );
});
export default RenderPage;
