import Constants from "expo-constants";

const { apiUrl } = Constants.expoConfig?.extra || {};

export async function requestProfileById(id: number): Promise<[]> {
    try {
        const response = await fetch(`${apiUrl}/api/users/${id}`);
        let data = response.json();
        if (data.image == null) {
            data.image = `${apiUrl}/uploads/placeholder.png`;
        }
        return Promise.resolve(data);
    }
    catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}