document.getElementById('div_convertidor').addEventListener('submit', async function (event) {
    event.preventDefault(); // Evita el envío del formulario de forma tradicional

    const urlInput = document.getElementById('url').value; // Obtener el enlace de YouTube

    try {
        const response = await fetch('https://tu-api-url.com/endpoint', { // Reemplaza con la URL de tu API
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: urlInput }) // Enviar el enlace como JSON
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // Suponiendo que tu API devuelve la URL del MP3
        const mp3Url = data.mp3Url; // Cambia esto según la estructura de tu respuesta
        downloadMP3(mp3Url); // Llamar a la función para descargar el MP3

    } catch (error) {
        console.error('Error al consumir la API:', error.message);
        alert('Error al convertir el video. Por favor, verifica la URL e intenta de nuevo.');
    }
});

// Función para descargar el archivo MP3
const downloadMP3 = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'audio.mp3'; // Nombre del archivo de descarga
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
