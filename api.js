document.getElementById('div_convertidor').addEventListener('submit', async function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe de forma tradicional

    const url = document.getElementById('url').value;

    try {
        const response = await fetch('https://api-mp3-b4hdf7hye4ged7dp.mexicocentral-01.azurewebsites.net/download', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.file_path) {
            // Crear un enlace de descarga
            const link = document.createElement('a');
            link.href = data.file_path; // La ruta al archivo MP3
            link.download = data.file_path.split('/').pop(); // Obtener el nombre del archivo
            document.body.appendChild(link);
            link.click(); // Simular un clic en el enlace
            document.body.removeChild(link); // Eliminar el enlace del DOM
            alert('¡Descarga completada con éxito!'); // Mensaje de éxito
        } else {
            alert('Error: ' + data.error);
        }
    } catch (error) {
        console.error('Error en la descarga:', error);
        alert('Ocurrió un error durante la descarga.');
    }
});
