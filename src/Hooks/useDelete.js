import axios from "axios";

export default function useDelete() {
    const deleteData = async (url) => {
        try {
            const res = await axios.delete(
                `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/${url}`,
                {
                    headers: {
                        apiKey: "",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            return res;
        } catch (error) {
            return error;
        }
    };

    return { deleteData };
}