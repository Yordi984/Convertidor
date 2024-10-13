const urlApi = 'https://youtube-mp3-downloader2.p.rapidapi.com/ytmp3/ytmp3/long_video.php';
const options = {
    method: 'GET', // Change to POST if required by the API
    headers: {
        'x-rapidapi-key': '6727fccc93msh40e3ed44d3579e8p164ba2jsnbd91ff1f0b1f',
        'x-rapidapi-host': 'youtube-mp3-downloader2.p.rapidapi.com',
        'Content-Type': 'application/json'
    }
};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('conversionForm').addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the form from submitting normally
        const videoUrl = document.getElementById('url').value;

        // Send the request to the API
        try {
            const response = await fetch(urlApi, {
                ...options,
                body: JSON.stringify({ url: videoUrl })
            });
            const data = await response.json();

            if (data.success) {
                const downloadLink = data.download_url; // Ensure this field exists in the API response
                const linkElement = document.createElement('a');
                linkElement.href = downloadLink;
                linkElement.download = 'video.mp3'; // Name of the file to be downloaded
                document.body.appendChild(linkElement);
                linkElement.click();
                document.body.removeChild(linkElement);
            } else {
                document.getElementById('result').textContent = 'Error: ' + data.message;
            }
        } catch (error) {
            console.error(error);
            document.getElementById('result').textContent = 'Error converting the video. Please try again.';
        }
    });
});
