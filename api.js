document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('div_convertidor');
    const urlInput = document.getElementById('url');
    const messageDiv = document.createElement('div'); // Crear un div para mostrar mensajes
    document.body.appendChild(messageDiv);

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar el envío del formulario por defecto

        const ytUrl = urlInput.value;

        // Verificar si la URL está vacía
        if (!ytUrl) {
            alert('Por favor, ingresa una URL de YouTube.');
            return;
        }

        // Enviar la solicitud a la API
        fetch('https://api-mp3-b4hdf7hye4ged7dp.mexicocentral-01.azurewebsites.net/download', {  // Reemplaza con tu URL de API
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: ytUrl })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta de la API: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.file_path) {
                const link = document.createElement('a');
                link.href = data.file_path; // URL del archivo MP3
                link.download = data.file_path.split('/').pop(); // Nombre del archivo para descargar
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                messageDiv.textContent = '¡Descarga completada con éxito!';
                messageDiv.style.color = 'green';
            } else {
                messageDiv.textContent = 'Error: ' + data.error;
                messageDiv.style.color = 'red';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            messageDiv.textContent = 'Ocurrió un error: ' + error.message;
            messageDiv.style.color = 'red';
        });
    });
});
