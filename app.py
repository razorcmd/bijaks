from flask import Flask, render_template, send_from_directory # send_from_directory akan berguna nanti

app = Flask(__name__)

@app.route('/')
def home():
    # Render template index.html dari folder 'templates'
    return render_template('index.html')

# Ini adalah rute opsional untuk melayani file statis secara eksplisit jika diperlukan
# Namun, Flask secara otomatis melayani file dari folder 'static'
# jadi rute ini mungkin tidak terlalu diperlukan jika hanya ada CSS/JS
@app.route('/static/<path:filename>')
def static_files(filename):
    return send_from_directory('static', filename)

# Baris ini DIKOMENTARI atau DIHAPUS karena Render/Gunicorn akan menjalankannya
# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000)