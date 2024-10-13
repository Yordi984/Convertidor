document.getElementById('conversionForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario por defecto

    const videoUrl = document.getElementById('url').value;
    const resultDiv = document.getElementById('result');

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
            const data = JSON.parse(this.responseText);
            if (data.link) {
                // Crea un enlace de descarga
                const downloadLink = document.createElement('a');
                downloadLink.href = data.link;
                downloadLink.download = 'video.mp3'; // Nombre por defecto para el archivo
                downloadLink.innerText = 'Descargar MP3';
                resultDiv.innerHTML = ''; // Limpia el div de resultados
                resultDiv.appendChild(downloadLink); // Añade el enlace al div
            } else {
                resultDiv.innerHTML = 'Error: ' + data.message;
            }
        }
    });

    xhr.open('GET', 'https://yt-search-and-download-mp3.p.rapidapi.com/mp3');
    xhr.setRequestHeader('x-rapidapi-key', '6727fccc93msh40e3ed44d3579e8p164ba2jsnbd91ff1f0b1f'); // Reemplaza con tu clave API
    xhr.setRequestHeader('x-rapidapi-host', 'yt-search-and-download-mp3.p.rapidapi.com');

    xhr.send(); // Envía la solicitud sin cuerpo
});
