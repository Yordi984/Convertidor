document.getElementById('conversionForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evitar el envío del formulario

    const urlInput = document.getElementById('url').value;
    const apiUrl = `https://youtube-mp3-downloader2.p.rapidapi.com/ytmp3/ytmp3/long_video.php?url=${encodeURIComponent(urlInput)}`;
    
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '6727fccc93msh40e3ed44d3579e8p164ba2jsnbd91ff1f0b1f', // Cambia por tu clave
            'x-rapidapi-host': 'youtube-mp3-downloader2.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(apiUrl, options);
        const result = await response.json(); // Asegúrate de que la respuesta sea JSON
        console.log(result); // Imprimir la respuesta en la consola
        

        // Asegúrate de que esta propiedad existe
        if (result.mp3Url) {
            // Crear un enlace para la descarga
            const a = document.createElement('a');
            a.href = result.mp3Url;
            a.download = 'video.mp3'; // Nombre del archivo a descargar
            document.body.appendChild(a);
            a.click(); // Hacer clic en el enlace para iniciar la descarga
            document.body.removeChild(a); // Limpiar el DOM
        } else {
            alert('No se pudo obtener el enlace de descarga.');
        }
    } catch (error) {
        console.error(error);
        alert('Error al convertir el video. Inténtalo de nuevo.');
    }
});
