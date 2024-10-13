document.getElementById('conversionForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const urlInput = document.getElementById('url').value.trim();
    const resultDiv = document.getElementById('result');
    const loadingDiv = document.getElementById('loading');

    loadingDiv.style.display = 'block';
    resultDiv.innerHTML = '';

    const apiUrl = `https://youtube-mp310.p.rapidapi.com/download/mp3?url=${encodeURIComponent(urlInput)}`;
    const options = {
        method: 'GET', // Cambia a 'POST' si la API lo requiere
        headers: {
            'x-rapidapi-key': '6727fccc93msh40e3ed44d3579e8p164ba2jsnbd91ff1f0b1f',
            'x-rapidapi-host': 'youtube-mp310.p.rapidapi.com',
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await fetch(apiUrl, options);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const result = await response.json();
        console.log(result); // Imprimir la respuesta de la API para depuración

        if (result.url) { // Ajusta según la estructura real de la respuesta
            const downloadLink = document.createElement('a');
            downloadLink.href = result.url;
            downloadLink.download = 'video.mp3';
            downloadLink.textContent = 'Descargar MP3';
            resultDiv.appendChild(downloadLink);
        } else {
            resultDiv.textContent = 'No se encontró la URL de descarga.';
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        resultDiv.textContent = 'Hubo un problema con la conversión. Por favor, intenta más tarde.';
    } finally {
        loadingDiv.style.display = 'none';
    }
});
