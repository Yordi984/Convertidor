// api.js
document.getElementById('div_convertidor').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario por defecto

    const url = document.getElementById('url').value; // Obtener el enlace de YouTube

    // Crear un elemento para mostrar el estado de la descarga
    const statusMessage = document.createElement('div');
    statusMessage.id = 'statusMessage';
    statusMessage.textContent = 'Cargando...'; // Mensaje inicial
    document.body.appendChild(statusMessage); // Mostrar el mensaje en el cuerpo

    // Realizar la solicitud POST a la API
    fetch('https://api-mp3-b4hdf7hye4ged7dp.mexicocentral-01.azurewebsites.net/download', {
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

        // Obtener el nombre del archivo desde el encabezado de la respuesta
        const fileName = response.headers.get('File-Name') || 'audio.mp3';
        return response.blob().then(blob => ({ blob, fileName }));
    })
    .then(({ blob, fileName }) => {
        const link = document.createElement('a'); // Crear un enlace de descarga
        link.href = URL.createObjectURL(blob); // Crear un objeto URL para el blob
        link.download = fileName; // Usar el nombre del archivo obtenido
        document.body.appendChild(link); // Añadir el enlace al documento
        link.click(); // Simular clic en el enlace para iniciar la descarga
        document.body.removeChild(link); // Eliminar el enlace después de usarlo
        URL.revokeObjectURL(link.href); // Revocar el objeto URL

        // Cambiar el mensaje de estado a 'Descarga completa'
        statusMessage.textContent = 'Descarga completa';
    })
    .catch(error => {
        alert(error.message); // Mostrar mensaje de error al usuario

        // Cambiar el mensaje de estado en caso de error
        statusMessage.textContent = 'Error al descargar el MP3';
    })
    .finally(() => {
        // Eliminar el mensaje de estado después de un tiempo
        setTimeout(() => {
            statusMessage.remove();
        }, 3000); // El mensaje se elimina después de 3 segundos
    });
});
