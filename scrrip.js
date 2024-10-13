const urlApi = 'https://youtube-mp3-downloader2.p.rapidapi.com/ytmp3/ytmp3'; 
const options = {
    method: 'POST',
    headers: {
        'x-rapidapi-key': 'YOUR_API_KEY', 
        'x-rapidapi-host': 'youtube-mp3-downloader2.p.rapidapi.com',
        'Content-Type': 'application/json'
    }
};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('conversionForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const videoUrl = document.getElementById('url').value;

        try {
            const response = await fetch(urlApi, {
                ...options,
                body: JSON.stringify({ url: videoUrl })
            });

            if (!response.ok) {
                const errorResponse = await response.text();
                console.error('API Error:', errorResponse);
                document.getElementById('result').textContent = 'Error: ' + errorResponse;
                return;
            }

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
