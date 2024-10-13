document.getElementById('conversionForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita el envío del formulario por defecto

    const videoUrl = document.getElementById('url').value;
    const resultDiv = document.getElementById('result');
    const apiUrl = 'https://yt-search-and-download-mp3.p.rapidapi.com/mp3';

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-rapidapi-key': 'TU_CLAVE_API', // Reemplaza con tu clave API
            'x-rapidapi-host': 'yt-search-and-download-mp3.p.rapidapi.com'
        },
        body: JSON.stringify({ url: videoUrl }) // Envía la URL del video
    };

    try {
        const response = await fetch(apiUrl, options);
        const result = await response.json(); // Parsear como JSON

        if (result.link) {
            const downloadLink = document.createElement('a');
            downloadLink.href = result.link;
            downloadLink.download = 'video.mp3'; // Nombre por defecto para el archivo
            downloadLink.innerText = 'Descargar MP3';
            resultDiv.innerHTML = ''; // Limpia el div de resultados
            resultDiv.appendChild(downloadLink); // Añade el enlace al div
        } else {
            resultDiv.innerHTML = 'Error: ' + (result.message || 'Error desconocido');
        }
    } catch (error) {
        console.error('Error:', error);
        resultDiv.innerHTML = 'Error al realizar la solicitud.';
    }
});
