document.getElementById('conversionForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    const urlInput = document.getElementById('url').value;
    const resultDiv = document.getElementById('result');
    const loadingDiv = document.getElementById('loading');

    // Mostrar el indicador de carga
    loadingDiv.style.display = 'block';
    resultDiv.innerHTML = ''; // Limpiar resultados anteriores

    const apiUrl = 'https://youtube-mp310.p.rapidapi.com/download/mp3?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Dphd1U2JIfUA';
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': '6727fccc93msh40e3ed44d3579e8p164ba2jsnbd91ff1f0b1f',
            'x-rapidapi-host': 'youtube-to-mp315.p.rapidapi.com',
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await fetch(apiUrl, options);
        const result = await response.json();

        // Verifica si la respuesta es correcta
        if (response.ok && result.url) {
            // Crea un enlace de descarga
            const downloadLink = document.createElement('a');
            downloadLink.href = result.url; // URL del MP3
            downloadLink.download = 'video.mp3'; // Nombre del archivo
            downloadLink.textContent = 'Descargar MP3';
            resultDiv.appendChild(downloadLink);
        } else {
            resultDiv.textContent = 'Error al convertir el video. Intenta nuevamente.';
        }
    } catch (error) {
        console.error(error);
        resultDiv.textContent = 'Hubo un problema con la conversión. Por favor, intenta más tarde.';
    } finally {
        // Ocultar el indicador de carga
        loadingDiv.style.display = 'none';
    }
});
