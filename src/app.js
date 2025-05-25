import './styles/style.css';
import './components/index.js';
import { addNote } from './data/remote/notes-api.js';
import { TabManager } from './utils/tab-manager.js';
import { NotesRenderer } from './utils/notes-renderer.js';

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelector('note-modal');
  const addNoteBtn = document.getElementById('add-note-btn');

  const tabManager = new TabManager();
  const notesRenderer = new NotesRenderer();

  setTimeout(() => {
    Toast.info('Welcome to Notes App! 🎉');
  }, 1000);

  addNoteBtn?.addEventListener('click', () => modal.show());

  modal.addEventListener('save-note', async e => {
    if (!e.detail || !e.detail.title || !e.detail.content) {
      Toast.warning('Title and content are required!');
      return;
    }

    try {
      Toast.info('Saving note...');
      const result = await addNote({
        title: e.detail.title,
        body: e.detail.content,
      });

      if (result.status !== 'success') {
        Toast.error(result.message || 'Failed to add note. Please try again.');
        return;
      }

      Toast.success('Note created successfully! 🎉');
      modal.hide();
      notesRenderer.refreshActiveOnly();
    } catch (err) {
      console.error('Failed to add note:', err);
      Toast.error('Failed to add note. Check your internet connection.');
    }
  });

  document.addEventListener('tab-changed', e => {
    console.log('Tab changed to:', e.detail.activeTab);
  });

  notesRenderer.refreshAll();
});
