// api.js
document.getElementById('div_convertidor').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    const url = document.getElementById('url').value; // Obtener el enlace de YouTube

    // Mostrar mensaje de carga mientras se procesa la solicitud
    const statusMessage = document.getElementById('status');
    statusMessage.textContent = 'Cargando...';

    // Realizar la solicitud POST a la API
    fetch('https://api-mp3-b4hdf7hye4ged7dp.mexicocentral-01.azurewebsites.net/download', { // URL de tu API
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url }) // Enviar el enlace en formato JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al descargar el MP3');
        }

        return response.json().then(data => {
            const fileName = data.title ? `${data.title}.mp3` : 'audio.mp3'; // Usar el título proporcionado por la API

            return response.blob().then(blob => ({ blob, fileName }));
        });
    })
    .then(({ blob, fileName }) => {
        const link = document.createElement('a'); // Crear un enlace de descarga
        link.href = URL.createObjectURL(blob); // Crear un objeto URL para el blob
        link.download = fileName; // Usar el nombre original del archivo proporcionado por la API
        document.body.appendChild(link); // Añadir el enlace al documento
        link.click(); // Simular clic en el enlace para iniciar la descarga
        document.body.removeChild(link); // Eliminar el enlace después de usarlo
        URL.revokeObjectURL(link.href); // Revocar el objeto URL

        // Cambiar el mensaje de estado
        statusMessage.textContent = 'Descarga completa';
    })
    .catch(error => {
        statusMessage.textContent = 'Error: ' + error.message; // Mostrar mensaje de error
    });
});
