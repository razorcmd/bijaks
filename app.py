from flask import Flask, render_template, send_from_directory, url_for
import json # Import pustaka json
import os # Import pustaka os untuk path file

app = Flask(__name__)

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

@app.route('/expenses')
def expenses_app():
    return render_template('expenses/index.html')

@app.route('/tracker')
def tracker_app():
    return render_template('tracker.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True) # debug=True akan mengaktifkan auto-reload