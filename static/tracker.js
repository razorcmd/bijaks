document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const todaySmokesEl = document.getElementById('today-smokes');
    const addSmokeBtn = document.getElementById('add-smoke-btn');
    const resetSmokesBtn = document.getElementById('reset-smokes-btn');
    
    const exerciseForm = document.getElementById('exercise-form');
    const exerciseInput = document.getElementById('exercise-input');
    const exerciseListEl = document.getElementById('exercise-list');

    const historyLogEl = document.getElementById('history-log');

    // --- State Management ---
    let data = {};

    // --- Utility Functions ---
    const getTodayKey = () => {
        const today = new Date();
        return today.toISOString().split('T')[0]; // YYYY-MM-DD format
    };

    const loadData = () => {
        const savedData = localStorage.getItem('quitSmokeTracker');
        data = savedData ? JSON.parse(savedData) : {};
    };

    const saveData = () => {
        localStorage.setItem('quitSmokeTracker', JSON.stringify(data));
    };

    const render = () => {
        const todayKey = getTodayKey();

        // Initialize today's data if it doesn't exist
        if (!data[todayKey]) {
            data[todayKey] = { smokes: 0, exercises: [] };
        }

        // Render smokes
        todaySmokesEl.textContent = data[todayKey].smokes;
        if (data[todayKey].smokes > 0) {
            todaySmokesEl.style.color = 'var(--secondary-color)';
        } else {
            todaySmokesEl.style.color = 'var(--primary-color)';
        }

        // Render exercises
        exerciseListEl.innerHTML = '';
        if (data[todayKey].exercises.length === 0) {
            exerciseListEl.innerHTML = '<li>Belum ada aktivitas.</li>';
        } else {
            data[todayKey].exercises.forEach((exercise, index) => {
                const li = document.createElement('li');
                li.textContent = exercise;
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = '×';
                deleteBtn.className = 'delete-exercise-btn';
                deleteBtn.dataset.index = index;
                li.appendChild(deleteBtn);
                exerciseListEl.appendChild(li);
            });
        }

        // Render history
        historyLogEl.innerHTML = '';
        const sortedKeys = Object.keys(data).sort().reverse(); // Newest first
        sortedKeys.forEach(key => {
            const entry = data[key];
            const date = new Date(key).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            
            let exercisesHtml = 'Tidak ada olahraga.';
            if (entry.exercises.length > 0) {
                exercisesHtml = `<ul>${entry.exercises.map(ex => `<li>- ${ex}</li>`).join('')}</ul>`;
            }

            historyItem.innerHTML = `
                <p><strong>${date}</strong></p>
                <p>🚬 Rokok: ${entry.smokes} batang</p>
                <p>🏃‍♂️ Olahraga: ${exercisesHtml}</p>
            `;
            historyLogEl.appendChild(historyItem);
        });
    };

    // --- Event Handlers ---
    const handleAddSmoke = () => {
        const todayKey = getTodayKey();
        data[todayKey].smokes += 1;
        saveData();
        render();
    };

    const handleResetSmokes = () => {
        if (confirm('Anda yakin ingin mereset jumlah rokok hari ini?')) {
            const todayKey = getTodayKey();
            data[todayKey].smokes = 0;
            saveData();
            render();
        }
    };

    const handleAddExercise = (e) => {
        e.preventDefault();
        const exerciseText = exerciseInput.value.trim();
        if (exerciseText) {
            const todayKey = getTodayKey();
            data[todayKey].exercises.push(exerciseText);
            exerciseInput.value = '';
            saveData();
            render();
        }
    };
    
    const handleDeleteExercise = (e) => {
        if (e.target.classList.contains('delete-exercise-btn')) {
            const index = parseInt(e.target.dataset.index, 10);
            const todayKey = getTodayKey();
            data[todayKey].exercises.splice(index, 1);
            saveData();
            render();
        }
    };

    // --- Initialization ---
    const init = () => {
        addSmokeBtn.addEventListener('click', handleAddSmoke);
        resetSmokesBtn.addEventListener('click', handleResetSmokes);
        exerciseForm.addEventListener('submit', handleAddExercise);
        exerciseListEl.addEventListener('click', handleDeleteExercise);
        
        loadData();
        render();
    };

    init();
});