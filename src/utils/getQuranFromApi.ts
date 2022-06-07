import axios from "axios";

export const getQuranFromApi = async () => {
  try {
    let res = await axios.get(
      "http://192.168.1.51:8001/api/quran/pages/lines/words"
    );

    let data = res.data;

    return data.pages;
  } catch (e) {
    console.log(e.repsone);
  }
};
