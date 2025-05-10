import './src/components/index.js';
import { notesData } from './src/data/data.js';

document.addEventListener('DOMContentLoaded', () => {
    const notesContainer = document.getElementById('notes-container');

    function renderNotes() {
        notesContainer.innerHTML = '';
        if (notesData.length === 0) {
            const noNotesMessage = document.createElement('p');
            noNotesMessage.textContent = 'No notes available. Click "New Note" to create one.';
            noNotesMessage.style.textAlign = 'center';
            notesContainer.appendChild(noNotesMessage);
            return;
        }

        notesData.forEach((note) => {
            const noteCard = document.createElement('note-card');
            noteCard.noteData = note;
            notesContainer.appendChild(noteCard);
        });
    }

    renderNotes();
});