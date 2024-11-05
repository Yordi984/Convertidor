document.getElementById('div_convertidor').addEventListener('submit', async function (event) {
    event.preventDefault(); // Evita el envío del formulario de forma tradicional

    const urlInput = document.getElementById('url').value; // Obtener el enlace de YouTube

    try {
        const response = await fetch('https://api-mp3-b4hdf7hye4ged7dp.mexicocentral-01.azurewebsites.net/download', { // Reemplaza con la URL de tu API
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
        console.log(data); // Para verificar la respuesta de la API

        // Verificar si se recibió la URL del MP3
        if (!data.file_path) {
            throw new Error('No se recibió la URL del MP3.');
        }

        // Llamar a la función para descargar el MP3
        downloadMP3(data.file_path);

    } catch (error) {
        console.error('Error al consumir la API:', error.message);
        alert('Error al convertir el video. Por favor, verifica la URL e intenta de nuevo.');
    }
});

// Función para descargar el archivo MP3
const downloadMP3 = (url) => {
    // Crear un enlace temporal para la descarga
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'audio.mp3'); // Nombre del archivo de descarga
    document.body.appendChild(link);
    link.click(); // Simular clic en el enlace
    document.body.removeChild(link); // Eliminar el enlace temporal
};
