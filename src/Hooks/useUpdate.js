import axios from "axios"

const useUpdate = () => {
    const update = async (url, body) => {
        try {
            const res = await axios.post(
                `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/${url}`,
                body,
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

    return { update };
}

export default useUpdate;
