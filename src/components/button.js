class NewNoteButton extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  _updateStyle() {
    this._style.textContent = `
            :host {
                display: inline-block;
                margin-bottom: 1rem;
            }

            .btn {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.5rem 1rem;
                font-size: 1rem;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                background-color: #000;
                color: white;
                transition: background 0.2s;
            }

            .btn:hover {
                background-color: #333;
            }
            .icon {
                width: 16px;
                height: 16px;
            }
            button#new-note-btn {
                box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                outline: none;
            }
            button#new-note-btn:focus {
                box-shadow: 0 0 0 2px #007bff33;
            }
        `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);

    const button = document.createElement('button');
    button.id = 'new-note-btn';
    button.className = 'btn';
    button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
                <path d="M5 12h14"></path>
                <path d="M12 5v14"></path>
            </svg>
            New Note
        `;

    button.addEventListener('click', () => {
      const modal = document.querySelector('note-modal');
      if (modal) {
        modal.show();
      }
    });

    this._shadowRoot.appendChild(button);
  }
}

customElements.define('new-note-button', NewNoteButton);
