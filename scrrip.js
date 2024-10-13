const urlApi = 'https://youtube-mp3-downloader2.p.rapidapi.com/ytmp3/ytmp3/long_video.php';
const options = {
    method: 'POST',
    headers: {
        'x-rapidapi-key': '6727fccc93msh40e3ed44d3579e8p164ba2jsnbd91ff1f0b1f',
        'x-rapidapi-host': 'youtube-mp3-downloader2.p.rapidapi.com',
        'Content-Type': 'application/json'
    }
};

document.getElementById('conversionForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita el envío del formulario
    const videoUrl = document.getElementById('url').value;

    // Envía la solicitud a la API
    try {
        const response = await fetch(urlApi, {
            ...options,
            body: JSON.stringify({ url: videoUrl })
        });
        const data = await response.json();

        if (data.success) {
            const downloadLink = data.download_url; // Asegúrate de que la API devuelva esta URL
            const linkElement = document.createElement('a');
            linkElement.href = downloadLink;
            linkElement.download = 'video.mp3'; // Nombre del archivo a descargar
            document.body.appendChild(linkElement);
            linkElement.click();
            document.body.removeChild(linkElement);
        } else {
            document.getElementById('result').textContent = 'Error: ' + data.message;
        }
    } catch (error) {
        console.error(error);
        document.getElementById('result').textContent = 'Error al convertir el video. Inténtalo de nuevo.';
    }
});
