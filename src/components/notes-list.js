import { getNotes } from '../data/remote/notes-api.js';

class NotesList extends HTMLElement {
  connectedCallback() {
    this.render();
    this.addEventListener('note-updated', () => this.render());
  }

  async render() {
    this.innerHTML = '<div>Loading...</div>';
    const notes = await getNotes();
    if (!notes.length) {
      this.innerHTML = '<p>Tidak ada catatan aktif.</p>';
      return;
    }
    this.innerHTML = notes
      .map(note => {
        const card = document.createElement('note-card');
        card.noteData = note;
        return card.outerHTML;
      })
      .join('');
  }
}
customElements.define('notes-list', NotesList);
