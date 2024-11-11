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
        return response.json();  // Parsear la respuesta JSON
    })
    .then(data => {
        // Obtener el nombre del archivo y la URL
        const fileUrl = data.file_url;
        const fileName = data.file_name;

        // Crear un enlace para la descarga
        const link = document.createElement('a'); // Crear un enlace de descarga
        link.href = fileUrl; // Usar la URL proporcionada por la API
        link.download = fileName; // Usar el nombre original del archivo
        document.body.appendChild(link); // Añadir el enlace al documento
        link.click(); // Simular clic en el enlace para iniciar la descarga
        document.body.removeChild(link); // Eliminar el enlace después de usarlo

        // Cambiar el mensaje de estado
        statusMessage.textContent = 'Descarga completa';
    })
    .catch(error => {
        statusMessage.textContent = 'Error: ' + error.message; // Mostrar mensaje de error
    });
});
