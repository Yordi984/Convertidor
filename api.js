document.getElementById('div_convertidor').addEventListener('submit', async (e) => {
  e.preventDefault();

  const url = document.getElementById('url').value;

  if (!url) {
    alert('Por favor, ingresa un enlace de YouTube.');
    return;
  }

  try {
    // Realizar la solicitud POST a la API
    const response = await fetch('https://api-mp3-b4hdf7hye4ged7dp.mexicocentral-01.azurewebsites.net/download', { // Cambia a la URL de tu API en Azure
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    const data = await response.json();

    if (response.ok && data.file_path) {
      // Redirige a la descarga del archivo MP3
      window.location.href = data.file_path;
    } else {
      alert(`Error: ${data.message || 'No se pudo completar la conversión.'}`);
    }
  } catch (error) {
    console.error('Ocurrió un error:', error);
    alert('Ocurrió un error durante la conversión. Inténtalo de nuevo más tarde.');
  }
});