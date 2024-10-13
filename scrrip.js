const form = document.getElementById('conversionForm');
const resultDiv = document.getElementById('result');

form.onsubmit = async (event) => {
    event.preventDefault(); // Evita que se recargue la página
    const url = document.getElementById('url').value;

    const apiUrl = `https://youtube-mp3-downloader2.p.rapidapi.com/ytmp3/ytmp3/long_video.php?url=${encodeURIComponent(url)}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '6727fccc93msh40e3ed44d3579e8p164ba2jsnbd91ff1f0b1f',
            'x-rapidapi-host': 'youtube-mp3-downloader2.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(apiUrl, options);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const result = await response.text();
        resultDiv.innerHTML = result; // Muestra el resultado en el div
    } catch (error) {
        resultDiv.innerHTML = `Error al convertir: ${error.message}`;
    }
};

            const data = await response.json();

            if (data.success) {
                const downloadLink = data.download_url; 
                const linkElement = document.createElement('a');
                linkElement.href = downloadLink;
                linkElement.download = 'video.mp3';
                document.body.appendChild(linkElement);
                linkElement.click();
                document.body.removeChild(linkElement);
            } else {
                document.getElementById('result').textContent = 'Error: ' + data.message;
            }
        } catch (error) {
            console.error('Fetch Error:', error);
            document.getElementById('result').textContent = 'Error converting the video. Please try again.';
        }
    });
});
