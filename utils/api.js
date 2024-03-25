// Función que usamos para realizar las peticiones HTTP al backend
export async function makeRequest(url, method, body = null, headers = {}) {
    const accessToken = localStorage.getItem('accessToken');
    try {
        // Fusionar las cabeceras predeterminadas con las proporcionadas
        const mergedHeaders = Object.assign(
            { 
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json",
                "Origin": "*"
            },
            headers
        );

        const requestOptions = {
            method: method,
            headers: new Headers(mergedHeaders),
            body: body ? JSON.stringify(body) : null
        };

        const response = await fetch(url, requestOptions);

        if (!response.ok) {
            // Si la respuesta no es exitosa, lanzar un error
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        // Devolver los datos de la respuesta como un objeto JSON
        return await response.json();
    } catch (error) {
        // Manejar cualquier error que pueda ocurrir durante la solicitud
        console.error('Error en la solicitud:', error.message);
        throw error; // Lanzar el error para que pueda ser manejado por el componente que llamó a la función
    }
}
