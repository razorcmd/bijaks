from flask import Flask, render_template_string

app = Flask(__name__)

@app.route('/')
def home():
    return render_template_string("""
        <h1>Halo dari Bijaks di Render!</h1>
        <p>Ini adalah aplikasi GUI berbasis web pertama Anda.</p>
        <button onclick="alert('Tombol diklik!')">Klik Saya</button>
    """)

# Baris di bawah ini DIKOMENTARI atau DIHAPUS untuk deployment ke Render/Gunicorn
# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000)