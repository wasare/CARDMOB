import Constants from 'expo-constants'; // novo

// const API_URL = Config.API_URL;
// const API_URL = 'http://10.81.205.50:5000';
const { apiUrl } = Constants.expoConfig?.extra || {}; // novo

export async function fakeLogin(email: string, password: string): Promise<string> {
    if (email === 'teste@example.com' && password === '123') {
        return Promise.resolve('fake-jwt-token');
    }
    return Promise.reject('Credenciais inválidas');
}

export async function requestLogin(email: string, password: string): Promise<string> {
    console.log(apiUrl); // alterado
    try {
        // alterado 
        const response = await fetch(`${apiUrl}/api/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password}),
        });
        const data = await response.json();
        const jwt = data.accessToken;
        console.log(jwt);
        return Promise.resolve(jwt);
    }
    catch (error) {
        console.error(error);
        return Promise.reject(error);
        // return Promise.reject('Credenciais inválidas');
    }
}
