import { modalTemplate } from './modal.template.js';

class NoteModal extends HTMLElement {
  static get observedAttributes() {
    return ['modal-title'];
  }

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'modal-title' && this._shadowRoot) {
      const titleEl = this._shadowRoot.querySelector('#modal-title');
      if (titleEl) titleEl.textContent = newValue;
    }
  }

  render() {
    this._shadowRoot.innerHTML = `
            <link rel="stylesheet" href="/styles/style.css">
            ${modalTemplate}
        `;

    const modalTitle = this.getAttribute('modal-title') || 'Create a new note';
    this._shadowRoot.querySelector('#modal-title').textContent = modalTitle;

    const saveBtn = this._shadowRoot.querySelector('#save-note');
    const titleInput = this._shadowRoot.querySelector('#note-title');
    const contentInput = this._shadowRoot.querySelector('#note-content');
    const titleError = this._shadowRoot.querySelector('#title-error');
    const contentError = this._shadowRoot.querySelector('#content-error');

    const updateSaveButtonState = () => {
      const isTitleValid = titleInput.value.trim().length > 0;
      const isContentValid = contentInput.value.trim().length > 0;
      saveBtn.disabled = !(isTitleValid && isContentValid);
    };

    titleInput.addEventListener('input', e => {
      const value = e.target.value.trim();
      if (!value) {
        titleError.style.display = 'block';
      } else {
        titleError.style.display = 'none';
      }
      updateSaveButtonState();
    });

    contentInput.addEventListener('input', e => {
      const value = e.target.value.trim();
      if (!value) {
        contentError.style.display = 'block';
      } else {
        contentError.style.display = 'none';
      }
      updateSaveButtonState();
    });

    updateSaveButtonState();

    this._shadowRoot
      .querySelector('.close-btn')
      .addEventListener('click', () => this.hide());
    saveBtn.addEventListener('click', () => this.saveNote());
  }

  show(title = '', content = '') {
    this._shadowRoot.querySelector('#note-title').value = title;
    this._shadowRoot.querySelector('#note-content').value = content;
    this._shadowRoot.querySelector('.modal').style.display = 'flex';
    this.clearErrors();
    this._shadowRoot.querySelector('#save-note').disabled = !(title && content);
  }

  hide() {
    this._shadowRoot.querySelector('.modal').style.display = 'none';
  }

  clearErrors() {
    this._shadowRoot.querySelector('#title-error').style.display = 'none';
    this._shadowRoot.querySelector('#content-error').style.display = 'none';
  }

  saveNote() {
    const title = this._shadowRoot.querySelector('#note-title').value.trim();
    const content = this._shadowRoot
      .querySelector('#note-content')
      .value.trim();
    const event = new CustomEvent('save-note', {
      detail: { title, content },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
    this.hide();
  }
}

customElements.define('note-modal', NoteModal);
