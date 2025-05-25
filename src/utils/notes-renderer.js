import {
  getNotes,
  getArchivedNotes,
  deleteNote,
  archiveNote,
  unarchiveNote,
} from '../data/remote/notes-api.js';

export class NotesRenderer {
  constructor() {
    this.notesActive = document.getElementById('notes-active');
    this.notesArchived = document.getElementById('notes-archived');
  }

  showToast(type, message) {
    if (window.Toast && Toast[type]) {
      Toast[type](message);
    } else {
      alert(`${type.toUpperCase()}: ${message}`);
    }
  }

  async renderActiveNotes() {
    this.showLoading(
      this.notesActive,
      'Loading active notes...',
      'Fetching your latest notes'
    );
    try {
      const notes = await getNotes();
      this.notesActive.innerHTML = '';

      if (!notes || notes.length === 0) {
        this.notesActive.innerHTML = this.getEmptyState('active');
        return;
      }

      notes.forEach((note, index) => {
        setTimeout(() => {
          const card = this.createNoteCard(note, 'active');
          this.notesActive.appendChild(card);
        }, index * 100);
      });
    } catch (error) {
      console.error('Error loading active notes:', error);
      this.notesActive.innerHTML = this.getErrorState(
        'Failed to load active notes'
      );
      this.showToast(
        'error',
        'Failed to load active notes. Please check your internet connection.'
      );
    }
  }

  async renderArchivedNotes() {
    this.showLoading(
      this.notesArchived,
      'Loading archived notes...',
      'Fetching your archived notes'
    );
    try {
      const notes = await getArchivedNotes();
      this.notesArchived.innerHTML = '';

      if (!notes || notes.length === 0) {
        this.notesArchived.innerHTML = this.getEmptyState('archived');
        return;
      }

      notes.forEach((note, index) => {
        setTimeout(() => {
          const card = this.createNoteCard(note, 'archived');
          this.notesArchived.appendChild(card);
        }, index * 100);
      });
    } catch (error) {
      console.error('Error loading archived notes:', error);
      this.notesArchived.innerHTML = this.getErrorState(
        'Failed to load archived notes'
      );
      this.showToast(
        'error',
        'Failed to load archived notes. Please try again.'
      );
    }
  }

  createNoteCard(note, type) {
    const card = document.createElement('note-card');
    card.noteData = note;

    card.addEventListener('delete-note', async () => {
      const confirmed = await this.showConfirmDialog(
        'Delete Note',
        'Are you sure you want to delete this note? This action cannot be undone.',
        'Delete',
        'Cancel'
      );

      if (confirmed) {
        try {
          this.showOperationLoading(card, 'Deleting...');
          const result = await deleteNote(note.id);
          if (result.status === 'success') {
            card.classList.add('note-card-exit');
            setTimeout(() => {
              this.showToast('success', 'Note deleted successfully!');
              this.refreshAll();
            }, 400);
          } else {
            this.showToast('error', 'Failed to delete note. Please try again.');
            this.hideOperationLoading(card);
          }
        } catch (error) {
          console.error('Error deleting note:', error);
          this.showToast(
            'error',
            'Failed to delete note. Check your connection.'
          );
          this.hideOperationLoading(card);
        }
      }
    });

    if (type === 'active') {
      card.addEventListener('archive-note', async () => {
        try {
          this.showOperationLoading(card, 'Archiving...');
          const result = await archiveNote(note.id);
          if (result.status === 'success') {
            card.classList.add('note-card-exit');
            setTimeout(() => {
              this.showToast('success', 'Note archived successfully!');
              this.refreshAll();
            }, 400);
          } else {
            this.showToast(
              'error',
              'Failed to archive note. Please try again.'
            );
            this.hideOperationLoading(card);
          }
        } catch (error) {
          console.error('Error archiving note:', error);
          this.showToast(
            'error',
            'Failed to archive note. Check your connection.'
          );
          this.hideOperationLoading(card);
        }
      });
    } else {
      card.addEventListener('unarchive-note', async () => {
        try {
          this.showOperationLoading(card, 'Unarchiving...');
          const result = await unarchiveNote(note.id);
          if (result.status === 'success') {
            card.classList.add('note-card-exit');
            setTimeout(() => {
              this.showToast('success', 'Note unarchived successfully!');
              this.refreshAll();
            }, 400);
          } else {
            this.showToast(
              'error',
              'Failed to unarchive note. Please try again.'
            );
            this.hideOperationLoading(card);
          }
        } catch (error) {
          console.error('Error unarchiving note:', error);
          this.showToast(
            'error',
            'Failed to unarchive note. Check your connection.'
          );
          this.hideOperationLoading(card);
        }
      });
    }

    return card;
  }

  async showConfirmDialog(
    title,
    message,
    confirmText = 'OK',
    cancelText = 'Cancel'
  ) {
    return new Promise(resolve => {
      const modal = document.createElement('div');
      modal.className = 'confirm-modal';
      modal.innerHTML = `
                <div class="confirm-modal-backdrop">
                    <div class="confirm-modal-content">
                        <div class="confirm-modal-header">
                            <h3>${title}</h3>
                        </div>
                        <div class="confirm-modal-body">
                            <p>${message}</p>
                        </div>
                        <div class="confirm-modal-footer">
                            <button class="btn-cancel">${cancelText}</button>
                            <button class="btn-confirm">${confirmText}</button>
                        </div>
                    </div>
                </div>
            `;

      const style = document.createElement('style');
      style.textContent = `
                .confirm-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    z-index: 10000;
                }
                .confirm-modal-backdrop {
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.5);
                    backdrop-filter: blur(5px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: fadeIn 0.2s ease-out;
                }
                .confirm-modal-content {
                    background: white;
                    border-radius: 12px;
                    max-width: 400px;
                    width: 90%;
                    overflow: hidden;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                    animation: modalSlideIn 0.3s ease-out;
                }
                .confirm-modal-header {
                    padding: 20px 20px 0;
                }
                .confirm-modal-header h3 {
                    margin: 0;
                    color: #333;
                }
                .confirm-modal-body {
                    padding: 16px 20px 20px;
                }
                .confirm-modal-body p {
                    margin: 0;
                    color: #666;
                    line-height: 1.5;
                }
                .confirm-modal-footer {
                    padding: 0 20px 20px;
                    display: flex;
                    gap: 12px;
                    justify-content: flex-end;
                }
                .btn-cancel, .btn-confirm {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: 500;
                    transition: all 0.2s;
                }
                .btn-cancel {
                    background: #f8f9fa;
                    color: #666;
                }
                .btn-cancel:hover {
                    background: #e9ecef;
                }
                .btn-confirm {
                    background: #dc3545;
                    color: white;
                }
                .btn-confirm:hover {
                    background: #c82333;
                }
            `;

      document.head.appendChild(style);
      document.body.appendChild(modal);

      modal.querySelector('.btn-cancel').addEventListener('click', () => {
        document.body.removeChild(modal);
        document.head.removeChild(style);
        resolve(false);
      });

      modal.querySelector('.btn-confirm').addEventListener('click', () => {
        document.body.removeChild(modal);
        document.head.removeChild(style);
        resolve(true);
      });

      modal
        .querySelector('.confirm-modal-backdrop')
        .addEventListener('click', e => {
          if (e.target === e.currentTarget) {
            document.body.removeChild(modal);
            document.head.removeChild(style);
            resolve(false);
          }
        });
    });
  }

  showLoading(container, message = 'Loading...', subtitle = '') {
    container.innerHTML = `<loading-indicator message="${message}" subtitle="${subtitle}"></loading-indicator>`;
  }

  showOperationLoading(card, message) {
    card.style.opacity = '0.6';
    card.style.pointerEvents = 'none';
    card.style.filter = 'blur(1px)';

    const overlay = document.createElement('div');
    overlay.className = 'operation-loading-overlay';
    overlay.innerHTML = `
            <div class="operation-loading-spinner"></div>
            <div class="operation-loading-text">${message}</div>
        `;
    overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255,255,255,0.9);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border-radius: 12px;
            z-index: 10;
        `;

    const spinner = overlay.querySelector('.operation-loading-spinner');
    spinner.style.cssText = `
            width: 24px;
            height: 24px;
            border: 3px solid #f3f3f3;
            border-top: 3px solid #007bff;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 8px;
        `;

    const text = overlay.querySelector('.operation-loading-text');
    text.style.cssText = `
            font-size: 12px;
            color: #666;
            font-weight: 500;
        `;

    card.style.position = 'relative';
    card.appendChild(overlay);
  }

  hideOperationLoading(card) {
    card.style.opacity = '1';
    card.style.pointerEvents = 'auto';
    card.style.filter = 'none';

    const overlay = card.querySelector('.operation-loading-overlay');
    if (overlay) {
      overlay.remove();
    }
  }

  getEmptyState(type) {
    if (type === 'active') {
      return `
                <div class="empty-state">
                    <i class="fas fa-sticky-note"></i>
                    <h3>No active notes</h3>
                    <p>Create your first note to get started!</p>
                </div>
            `;
    } else {
      return `
                <div class="empty-state">
                    <i class="fas fa-archive"></i>
                    <h3>No archived notes</h3>
                    <p>Archived notes will appear here</p>
                </div>
            `;
    }
  }

  getErrorState(message) {
    return `
            <div class="error-state">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Oops! Something went wrong</h3>
                <p>${message}</p>
                <button onclick="location.reload()" class="retry-btn">
                    <i class="fas fa-redo"></i> Try Again
                </button>
            </div>
        `;
  }

  refreshAll() {
    this.renderActiveNotes();
    this.renderArchivedNotes();
  }

  refreshActiveOnly() {
    this.renderActiveNotes();
  }

  refreshArchivedOnly() {
    this.renderArchivedNotes();
  }
}
