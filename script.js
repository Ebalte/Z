let notes = JSON.parse(localStorage.getItem('notes')) || [];

displayNotes();

function displayNotes() {
    const noteList = document.getElementById('note-list');
    noteList.innerHTML = '';

    if (notes.length === 0) {
        document.getElementById('no-notes').style.display = 'block';
        document.getElementById('delete-selected').style.display = 'none'; // Скрываем кнопку удаления
    } else {
        document.getElementById('no-notes').style.display = 'none';
        notes.forEach((note, index) => {
            const noteDiv = document.createElement('div');
            noteDiv.className = 'note-item';
            noteDiv.innerHTML = `
                <input type="checkbox" onchange="toggleSelect(${index})" ${note.selected ? 'checked' : ''}>
                <div class="note-header" onclick="openNote(${index})">
                    <h3 class="note-title">${note.title}</h3>
                </div>
                <div class="note-content">${note.content}</div>
            `;
            noteList.appendChild(noteDiv);
        });
    }

    const deleteButton = document.getElementById('delete-selected');
    deleteButton.style.display = notes.some(note => note.selected) ? 'block' : 'none';
}

function openNote(index) {
    const note = notes[index];
    const noteDetail = `
        <h2>${note.title}</h2>
        <div class="note-content">${note.content}</div>
        <button onclick="editNote(${index})">Редактировать</button>
        <button onclick="goBack()">Назад</button>
    `;
    document.body.innerHTML = noteDetail; 
}

function editNote(index) {
    localStorage.setItem('editingIndex', index);
    location.href = 'create-note.html'; 
}

function goBack() {
    location.reload(); 
}

function toggleSelect(index) {
    if (index >= 0 && index < notes.length) { // Добавлена проверка индекса
        notes[index].selected = !notes[index].selected;
        localStorage.setItem('notes', JSON.stringify(notes));
        displayNotes();
    }
}

function deleteSelectedNotes() {
    notes = notes.filter(note => !note.selected); // Удаляем выбранные заметки
    localStorage.setItem('notes', JSON.stringify(notes)); 
    displayNotes();
}

function solveMathEquation(input) {
    try {
        const match = input.match(/([0-9+\-*/\s\(\)]+)=/);
        if (match) {
            const expression = match[1].trim();
            if (/^[0-9+\-*/\s\(\)]+$/.test(expression)) {
                return new Function(`'use strict'; return (${expression})`)(); // Используйте безопасную замену eval
            }
        }
    } catch (e) {
        console.error('Ошибка вычисления:', e);
    }
    return null;
}
