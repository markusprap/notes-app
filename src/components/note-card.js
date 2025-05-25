class NoteCard extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  set noteData(note) {
    this.render(note);
  }

  _updateStyle() {
    this._style.textContent = `
            @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');

            :host {
                display: block;
                width: 100%;
                height: fit-content;
            }
            
            .note-card {
                background-color: white;
                border-radius: 12px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                padding: 20px;
                position: relative;
                display: flex;
                flex-direction: column;
                height: 100%;
                transition: transform 0.2s, box-shadow 0.2s;
                border: 1px solid #e9ecef;
            }
            
            .note-card:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
            }
            
            .note-title {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 12px;
                padding-right: 80px;
                color: #212529;
                line-height: 1.4;
            }
            
            .note-body {
                font-size: 14px;
                color: #6c757d;
                margin-bottom: 16px;
                flex-grow: 1;
                line-height: 1.5;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 4;
                -webkit-box-orient: vertical;
            }
            
            .note-date {
                font-size: 12px;
                color: #adb5bd;
                margin-top: auto;
                padding-top: 12px;
                border-top: 1px solid #f1f3f4;
                display: flex;
                align-items: center;
                gap: 6px;
            }
            
            .note-actions {
                position: absolute;
                top: 16px;
                right: 16px;
                display: flex;
                gap: 8px;
            }
            
            .icon-btn {
                background: rgba(255, 255, 255, 0.9);
                border: none;
                cursor: pointer;
                padding: 8px;
                border-radius: 50%;
                transition: all 0.2s;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 36px;
                height: 36px;
                backdrop-filter: blur(10px);
            }
            
            .icon-btn:hover {
                transform: scale(1.1);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }
            
        `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  render(note = {}) {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);

    this._shadowRoot.innerHTML += `
            <div class="note-card">
                <div class="note-actions">
                    ${
                      note.archived
                        ? `<button class="icon-btn unarchive-btn" title="Unarchive Note">
                            📤
                          </button>`
                        : `<button class="icon-btn archive-btn" title="Archive Note">
                            📥
                          </button>`
                    }
                    <button class="icon-btn delete-btn" title="Delete Note">
                        🗑
                    </button>
                </div>
                <div class="note-title">${note.title || ''}</div>
                <div class="note-body">${note.body || ''}</div>
                <div class="note-date">
                    <i class="far fa-calendar-alt"></i>
                    ${note.createdAt ? new Date(note.createdAt).toLocaleDateString('id-ID') : ''}
                </div>
            </div>
        `;

    setTimeout(() => {
      const deleteBtn = this._shadowRoot.querySelector('.delete-btn');
      deleteBtn &&
        deleteBtn.addEventListener('click', () => {
          this.dispatchEvent(
            new CustomEvent('delete-note', { bubbles: true, composed: true })
          );
        });

      const archiveBtn = this._shadowRoot.querySelector(
        '.archive-btn, .unarchive-btn'
      );
      if (archiveBtn) {
        archiveBtn.addEventListener('click', () => {
          if (note.archived) {
            this.dispatchEvent(
              new CustomEvent('unarchive-note', {
                bubbles: true,
                composed: true,
              })
            );
          } else {
            this.dispatchEvent(
              new CustomEvent('archive-note', { bubbles: true, composed: true })
            );
          }
        });
      }
    }, 0);
  }
}

customElements.define('note-card', NoteCard);
