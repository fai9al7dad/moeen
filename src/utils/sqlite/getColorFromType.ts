import { mistakesColor } from "./../../assets/conts/mistakes";
export const getColorFromType = (type) => {
  let color;
  switch (type) {
    case "revert":
      color = mistakesColor.default;
      break;
    case "warning":
      color = mistakesColor.warning;
      break;
    case "mistake":
      color = mistakesColor.mistake;
      break;
  }
  return color;
};
