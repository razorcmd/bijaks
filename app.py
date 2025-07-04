from flask import Flask, render_template, send_from_directory, url_for # Tambahkan url_for di sini
import json # Import pustaka json
import os # Import pustaka os untuk path file

app = Flask(__name__)

# --- Perbaikan send_from_directory (direkomendasikan) ---
# Fungsi ini untuk melayani file statis secara eksplisit.
# Flask biasanya sudah bisa melakukannya, tapi ini lebih robust.
@app.route('/static/<path:filename>')
def static_files(filename):
    return send_from_directory(os.path.join(app.root_path, 'static'), filename) # Menggunakan os.path.join dan app.root_path

@app.route('/')
def home():
    # --- Memuat Data Proyek dari JSON ---
    projects_file_path = os.path.join(app.root_path, 'data', 'projects.json')
    try:
        with open(projects_file_path, 'r', encoding='utf-8') as f:
            projects_data = json.load(f)
    except FileNotFoundError:
        projects_data = [] # Jika file tidak ditemukan, return list kosong
        print(f"Warning: {projects_file_path} not found. Projects data will be empty.")
    except json.JSONDecodeError:
        projects_data = [] # Jika JSON tidak valid, return list kosong
        print(f"Error: Could not decode JSON from {projects_file_path}. Projects data will be empty.")

    # --- Mengatur URL Gambar Hero Background ---
    # Asumsi hero-bg.jpg ada di static/images/
    hero_bg_url = url_for('static', filename='images/hero-bg.jpg') # Ini akan dioper ke template

    # Render template index.html dan oper data proyek serta URL gambar hero
    return render_template('index.html', 
                           projects_data=projects_data, 
                           hero_bg_url=hero_bg_url)

# Baris ini DIKOMENTARI atau DIHAPUS karena Render/Gunicorn akan menjalankannya
# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000)