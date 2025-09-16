const API_URL = 'http://10.81.205.50:5000';


export async function getCatalog(): Promise<any[]> { // alterado
    try {
        const response = await fetch(`${API_URL}/api/catalog`);
        const data = await response.json();
        // console.log(data);
        // return Promise.resolve(data.catalog);
        return data.catalog; // incluido / alterado
    }
    catch (error) {
        console.error(error);
        return Promise.reject('Erro ao obter produtos');
    }
}
