from flask import Flask, request, jsonify, send_file
from pytube import YouTube
from moviepy.editor import VideoFileClip
import os

app = Flask(__name__)

@app.route('/convert', methods=['POST'])
def convert():
    url = request.json.get('url')
    if not url:
        return jsonify({'error': 'No URL provided'}), 400

    try:
        # Descargar el video
        yt = YouTube(url)
        stream = yt.streams.filter(only_video=True).first()
        video_file = 'video.mp4'
        stream.download(filename=video_file)

        # Convertir el video a MP3
        video_clip = VideoFileClip(video_file)
        audio_file = 'audio.mp3'
        video_clip.audio.write_audiofile(audio_file)

        # Limpiar el archivo de video
        os.remove(video_file)

        return send_file(audio_file, as_attachment=True, mimetype='audio/mpeg')

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        # Asegurarse de que los archivos temporales se eliminen
        if os.path.exists('video.mp4'):
            os.remove('video.mp4')
        if os.path.exists('audio.mp3'):
            os.remove('audio.mp3')

if __name__ == '__main__':
    app.run(debug=True)

