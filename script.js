const notes = JSON.parse(localStorage.getItem('notes')) || [];

displayNotes();

function displayNotes() {
    const noteList = document.getElementById('note-list');
    noteList.innerHTML = '';

    if (notes.length === 0) {
        document.getElementById('no-notes').style.display = 'block';
    } else {
        document.getElementById('no-notes').style.display = 'none';
        notes.forEach((note, index) => {
            const noteDiv = document.createElement('div');
            noteDiv.className = 'note-item';
            noteDiv.innerHTML = `
                <input type="checkbox" onchange="toggleSelect(${index})">
                <div class="note-header" onclick="openNote(${index})">
                    <h3 class="note-title">${note.title}</h3>
                </div>
                <div class="note-content">${note.content}</div>
            `;
            noteList.appendChild(noteDiv);
        });
    }

    document.getElementById('delete-selected').style.display = notes.some(note => note.selected) ? 'block' : 'none';
}

function openNote(index) {
    const note = notes[index];
    const noteDetail = `
        <h2>${note.title}</h2>
        <div class="note-content">${note.content}</div>
        <button onclick="editNote(${index})">Редактировать</button>
        <button onclick="goBack()">Назад</button>
    `;
    document.body.innerHTML = noteDetail; // Заменить содержимое страницы

    // Добавить обработку для математического выражения, если это страница заметки
    if (document.getElementById('note-content')) {
        document.getElementById('note-content').addEventListener('input', function () {
            const inputText = this.value;
            const mathResult = solveMathEquation(inputText);
            if (mathResult) {
                const lastLine = inputText.split('\n').slice(-1)[0];
                if (lastLine.includes('=')) {
                    this.value = inputText.replace(/(.*=).*$/, `$1${mathResult}`); // Заменяем уравнение результатом
                }
            }
        });
    }
}

function editNote(index) {
    localStorage.setItem('editingIndex', index); // Устанавливаем индекс редактирования
    location.href = 'create-note.html'; // Переход к странице редактирования
}

function goBack() {
    window.location.reload(); // Вернуться назад
}

function toggleSelect(index) {
    notes[index].selected = !notes[index].selected;
    displayNotes();
}

function deleteSelectedNotes() {
    const remainingNotes = notes.filter(note => !note.selected);
    notes.length = 0; // Очищаем массив
    notes.push(...remainingNotes); // Заполняем массив оставшимися заметками
    alert('Выбранные заметки удалены.');
    localStorage.setItem('notes', JSON.stringify(notes)); // Сохраняем оставшиеся заметки
    displayNotes();
}

function solveMathEquation(input) {
    try {
        const match = input.match(/([0-9+\-*/\s\(\)]+)=/);
        if (match) {
            const expression = match[1].trim();
            if (/^[0-9+\-*/\s\(\)]+$/.test(expression)) {
                return eval(expression); // Опасно, не рекомендуется для продакшн-кода
            }
        }
    } catch (e) {
        console.error('Ошибка вычисления:', e);
    }
    return null;
}
