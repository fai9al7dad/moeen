import React from "react";
import { Box } from "native-base";
import PageHeader from "./PageHeader";
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
