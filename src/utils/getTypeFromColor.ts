import { mistakesColor } from "./../assets/conts/mistakes";
export const getTypeFromColor = (color) => {
  let type;
  switch (color) {
    case mistakesColor.default:
      type = "revert";
      break;
    case mistakesColor.warning:
      type = "warning";
      break;
    case mistakesColor.mistake:
      type = "mistake";
      break;
  }
  return type;
};
