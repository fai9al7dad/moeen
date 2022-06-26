import React from "react";
import { Box, Text } from "native-base";
import PageHeader from "./PageHeader";
import RenderWords from "./components/RenderWords";

interface props {
  data: any;
  width: number;
  height: number;
}
const RenderPage: React.FC<props> = React.memo(({ data, width, height }) => {
  return (
    <Box height={height} width={width}>
      <PageHeader data={data} />
      <Box justifyContent="center" alignItems={"center"}>
        <RenderWords data={data} />
      </Box>
    </Box>
  );
});
export default RenderPage;
