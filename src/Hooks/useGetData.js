import axios from "axios";
export default function useGetData() {
  const getData = async (url, callback) => {
    try {
      const res = await axios.get(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/${url}`,
        {
          headers: { apiKey: "" },
        }
      );
      callback(res);
    } catch (error) {
      console.log(error);
    }
  };
  return { getData };
}
