document.getElementById('div_convertidor').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    const url = document.getElementById('url').value; // Obtener el enlace de YouTube

    // Mostrar mensaje de carga mientras se procesa la solicitud
    const statusMessage = document.getElementById('status');
    statusMessage.textContent = 'Cargando...';

    // Realizar la solicitud POST a la API
    fetch('https://tu-api.azurewebsites.net/download', { // Cambia esta URL por la de tu API
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url }) // Enviar el enlace en formato JSON
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            throw new Error(data.error);
        }

        // Si la respuesta es exitosa, descarga el archivo con el nombre original
        const fileUrl = data.file;
        const fileName = fileUrl.split('/').pop(); // Extraer el nombre del archivo

        const link = document.createElement('a'); // Crear un enlace de descarga
        link.href = fileUrl; // Establecer el URL del archivo
        link.download = fileName; // Usar el nombre del archivo para la descarga
        document.body.appendChild(link); // Añadir el enlace al documento
        link.click(); // Simular clic en el enlace para iniciar la descarga
        document.body.removeChild(link); // Eliminar el enlace después de usarlo

        // Actualizar el mensaje de estado
        statusMessage.textContent = 'Descarga completa';
    })
    .catch(error => {
        // Mostrar mensaje de error
        statusMessage.textContent = 'Error: ' + error.message;
    });
});
