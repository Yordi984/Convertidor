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
    .then(response => response.json()) // Obtener la respuesta como JSON
    .then(data => {
        if (data.error) {
            throw new Error(data.error); // Si hay un error en la respuesta, mostrarlo
        }

        // Obtener la URL y el nombre del archivo desde la respuesta de la API
        const fileUrl = data.file_path;  // Ruta al archivo descargado
        const fileName = data.file_name; // Nombre del archivo (título del video)

        // Realizar la descarga del archivo
        fetch(fileUrl)
            .then(response => response.blob())  // Convertir la respuesta a blob
            .then(blob => {
                const link = document.createElement('a'); // Crear un enlace de descarga
                link.href = URL.createObjectURL(blob);  // Crear un objeto URL para el blob
                link.download = fileName;  // Usar el nombre del archivo que recibió de la API
                document.body.appendChild(link); // Añadir el enlace al documento
                link.click(); // Simular clic en el enlace para iniciar la descarga
                document.body.removeChild(link); // Eliminar el enlace después de usarlo
                URL.revokeObjectURL(link.href); // Revocar el objeto URL
            })
            .catch(error => {
                alert('Error al descargar el archivo: ' + error.message); // Mostrar mensaje de error al usuario
            });
    })
    .catch(error => {
        alert('Error al procesar la solicitud: ' + error.message); // Mostrar mensaje de error si la solicitud falla
    });
});
