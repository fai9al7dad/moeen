import React from "react";
import Line from "./Line";

const RenderWords: React.FC<any> = (props) => {
  const { data } = props;
  let lines: any = [];
  for (let i = 0; i < data.lines.length; i++) {
    lines[i] = <Line key={data.lines[i].id} {...data.lines[i]} />;
  }
  return lines;
};
export default RenderWords;
