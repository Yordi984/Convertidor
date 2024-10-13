document.getElementById('conversionForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita el envío del formulario

    const urlInput = document.getElementById('url').value;
    const apiUrl = `https://youtube-mp3-downloader2.p.rapidapi.com/ytmp3/ytmp3/long_video.php?url=${encodeURIComponent(urlInput)}`;
    
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '6727fccc93msh40e3ed44d3579e8p164ba2jsnbd91ff1f0b1f',
            'x-rapidapi-host': 'youtube-mp3-downloader2.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(apiUrl, options);
        const result = await response.text(); // Obtiene la respuesta como texto

        // Aquí deberías extraer la URL de descarga
        const downloadUrl = extractDownloadUrl(result); // Función para extraer la URL

        if (downloadUrl) {
            // Crea un enlace para descargar el archivo
            const a = document.createElement('a');
            a.href = downloadUrl; // URL de descarga
            a.download = 'video.mp3'; // Nombre del archivo que se descargará
            document.body.appendChild(a);
            a.click(); // Simula el clic en el enlace para iniciar la descarga
            document.body.removeChild(a); // Elimina el enlace después de la descarga
        } else {
            document.getElementById('result').innerText = 'No se pudo obtener la URL de descarga.';
        }

    } catch (error) {
        console.error('Error:', error);
        document.getElementById('result').innerText = 'Hubo un error al intentar descargar el MP3.';
    }
});

// Función para extraer la URL de descarga del texto de la respuesta
function extractDownloadUrl(responseText) {
    // Ajusta esta lógica según el formato real de la respuesta
    const match = responseText.match(/https?:\/\/[^"]+/); // Simple regex para encontrar una URL
    return match ? match[0] : null;
}
