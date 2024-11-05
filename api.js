// api.js
document.getElementById('div_convertidor').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario por defecto

    const url = document.getElementById('url').value; // Obtener el enlace de YouTube

    // Realizar la solicitud POST a la API
    fetch('https://api-mp3-b4hdf7hye4ged7dp.mexicocentral-01.azurewebsites.net/download', { // Reemplaza 'https://tu-api-url' con la URL de tu API
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
        return response.blob(); // Convertir la respuesta a un blob
    })
    .then(blob => {
        const link = document.createElement('a'); // Crear un enlace de descarga
        link.href = URL.createObjectURL(blob); // Crear un objeto URL para el blob
        link.download = 'audio.mp3'; // Nombre del archivo que se descargará
        document.body.appendChild(link); // Añadir el enlace al documento
        link.click(); // Simular clic en el enlace para iniciar la descarga
        document.body.removeChild(link); // Eliminar el enlace después de usarlo
        URL.revokeObjectURL(link.href); // Revocar el objeto URL
    })
    .catch(error => {
        alert(error.message); // Mostrar mensaje de error al usuario
    });
});
