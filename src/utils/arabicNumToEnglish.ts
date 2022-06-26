export const arabicNumToEnglish = (s) =>
  s.replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));
