document
  .getElementById("div_convertidor")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita que el formulario se envíe de manera tradicional

    const ytUrl = document.getElementById("url").value; // Obtiene la URL del input

    const data = {
      url: ytUrl,
      output_directory: "downloads", // Puedes ajustar esto si es necesario
    };

    try {
      const response = await fetch(
        "https://api-mp3-b4hdf7hye4ged7dp.mexicocentral-01.azurewebsites.net/download",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      // Manejar la respuesta aquí, por ejemplo, mostrar un mensaje al usuario
      alert(result.message);
    } catch (error) {
      console.error("Error al descargar:", error);
      alert("Ocurrió un error: " + error.message);
    }
  });
