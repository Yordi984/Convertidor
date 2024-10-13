const urlApi = 'https://youtube-mp3-downloader2.p.rapidapi.com/ytmp3/ytmp3/long_video.php';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '6727fccc93msh40e3ed44d3579e8p164ba2jsnbd91ff1f0b1f',
        'x-rapidapi-host': 'youtube-mp3-downloader2.p.rapidapi.com'
    }
};

document.getElementById('conversionForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita el envío del formulario
    const videoUrl = document.getElementById('url').value;

    // Aquí puedes agregar lógica para construir la URL de la API con el enlace del video si es necesario

    try {
        const response = await fetch(urlApi, options);
        const result = await response.text();
        document.getElementById('result').textContent = result; // Muestra el resultado
    } catch (error) {
        console.error(error);
        document.getElementById('result').textContent = 'Error al convertir el video. Inténtalo de nuevo.';
    }
});
