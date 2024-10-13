const urlApi = 'https://youtube-mp3-downloader2.p.rapidapi.com/ytmp3/ytmp3/long_video.php'; // Asegúrate de que este endpoint sea correcto
const options = {
    method: 'POST',
    headers: {
        'x-rapidapi-key': '6727fccc93msh40e3ed44d3579e8p164ba2jsnbd91ff1f0b1f', // Reemplaza con tu clave real
        'x-rapidapi-host': 'youtube-mp3-downloader2.p.rapidapi.com',
        'Content-Type': 'application/json'
    }
};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('conversionForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const videoUrl = document.getElementById('url').value;

        try {
            const response = await fetch(urlApi, {
                ...options,
                body: JSON.stringify({ url: videoUrl })
            });

            if (!response.ok) {
                const errorResponse = await response.text();
                console.error('Error de API:', errorResponse);
                document.getElementById('result').textContent = 'Error: ' + errorResponse;
                return;
            }

            const data = await response.json();
            console.log(data); // Para depurar

            if (data.success) {
                const downloadLink = data.download_url; 
                if (downloadLink) {
                    const linkElement = document.createElement('a');
                    linkElement.href = downloadLink;
                    linkElement.download = 'video.mp3'; // Nombre del archivo
                    document.body.appendChild(linkElement);
                    linkElement.click();
                    document.body.removeChild(linkElement);
                } else {
                    document.getElementById('result').textContent = 'El archivo no está disponible.';
                }
            } else {
                document.getElementById('result').textContent = 'Error: ' + data.message;
            }
        } catch (error) {
            console.error('Error de Fetch:', error);
            document.getElementById('result').textContent = 'Error al convertir el video. Por favor, intenta de nuevo.';
        }
    });
});
