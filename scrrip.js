document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('conversionForm').addEventListener('submit', async function(event) {
        event.preventDefault(); // Evitar el envío del formulario

        const urlInput = document.getElementById('url').value;
        const apiUrl = `https://youtube-to-mp3-converter-free-and-easy-conversion-api.p.rapidapi.com/api.php?yt=${encodeURIComponent(urlInput)}`;
        
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '6727fccc93msh40e3ed44d3579e8p164ba2jsnbd91ff1f0b1f', // Reemplaza por tu clave de API
                'x-rapidapi-host': 'youtube-to-mp3-converter-free-and-easy-conversion-api.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(apiUrl, options);
            const result = await response.json(); // Cambia a .json()
            console.log(result); // Imprime la respuesta

            if (result.success && result.mp3Url) {
                const a = document.createElement('a');
                a.href = result.mp3Url; // URL del MP3
                a.download = 'video.mp3'; // Nombre del archivo a descargar
                document.body.appendChild(a);
                a.click(); // Simula clic para descargar
                document.body.removeChild(a); // Limpia el DOM
            } else {
                alert('No se pudo obtener el enlace de descarga.');
            }
        } catch (error) {
            console.error(error);
            alert('Error al convertir el video. Inténtalo de nuevo.');
        }
    });
});
