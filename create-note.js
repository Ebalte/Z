const notes = JSON.parse(localStorage.getItem('notes')) || [];
const editingIndex = localStorage.getItem('editingIndex');

const noteContentDiv = document.getElementById('note-content-div');

if (editingIndex !== null && notes[editingIndex]) {
    const note = notes[editingIndex];
    document.getElementById('note-title').value = note.title;
    noteContentDiv.innerHTML = note.content; // Устанавливаем HTML-содержимое
}

document.getElementById('note-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById('note-title').value;
    const content = noteContentDiv.innerHTML; // Получаем HTML-содержимое

    const note = { title, content };

    if (editingIndex !== null) {
        notes[editingIndex] = note; // Обновление существующей заметки
    } else {
        notes.push(note); // Добавление новой заметки
    }

    localStorage.setItem('notes', JSON.stringify(notes)); // Сохраняем заметки
    alert('Заметка успешно сохранена!');
    localStorage.removeItem('editingIndex'); // Удаляем индекс редактирования
    location.href = 'index.html'; // Возврат на главную страницу
});

// Обновление функции для добавления изображения
function addImageToText(input) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imgTag = `<img src="${e.target.result}" style="max-width: 100%; margin-top: 10px;"/>`;
            noteContentDiv.innerHTML += imgTag; // Добавляем изображение в HTML-содержимое
        };
        reader.readAsDataURL(file);
    }
}
