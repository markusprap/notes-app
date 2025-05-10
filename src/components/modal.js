class NoteModal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .modal {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                    z-index: 1000;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .modal-content {
                    background-color: white;
                    margin: auto;
                    width: 90%;
                    max-width: 600px;
                    border-radius: 8px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                    overflow: hidden;
                }
                .modal-header {
                    padding: 16px;
                    border-bottom: 1px solid #eee;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .modal-body {
                    padding: 16px;
                }
                #note-title, #note-content {
                    width: 100%;
                    max-width: 100%;
                    box-sizing: border-box;
                    padding: 12px;
                    margin-bottom: 12px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                }
                #note-content {
                    height: 200px;
                }
                .modal-footer {
                    padding: 16px;
                    text-align: right;
                }
                .btn-primary {
                    background-color: #000;
                    color: white;
                    padding: 8px 16px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }
                .btn-primary:hover {
                    background-color: #333;
                }
                .error {
                    color: red;
                    font-size: 14px;
                    margin-top: -10px;
                    margin-bottom: 10px;
                }
            </style>
            <div class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 id="modal-title">Create a new note</h2>
                        <button class="close-btn">X</button>
                    </div>
                    <div class="modal-body">
                        <input id="note-title" type="text" placeholder="Enter note title" />
                        <div id="title-error" class="error" style="display: none;">Title is required.</div>
                        <textarea id="note-content" placeholder="What's on your mind?"></textarea>
                        <div id="content-error" class="error" style="display: none;">Content is required.</div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn-primary" id="save-note">Save Note</button>
                    </div>
                </div>
            </div>
        `;

        this.shadowRoot.querySelector('.close-btn').addEventListener('click', () => this.hide());
        this.shadowRoot.querySelector('#save-note').addEventListener('click', () => this.saveNote());
    }

    show(title = '', content = '') {
        this.shadowRoot.querySelector('#note-title').value = title;
        this.shadowRoot.querySelector('#note-content').value = content;
        this.shadowRoot.querySelector('.modal').style.display = 'flex';
        this.clearErrors();
    }

    hide() {
        this.shadowRoot.querySelector('.modal').style.display = 'none';
    }

    clearErrors() {
        this.shadowRoot.querySelector('#title-error').style.display = 'none';
        this.shadowRoot.querySelector('#content-error').style.display = 'none';
    }

    validateInputs(title, content) {
        let isValid = true;

        if (!title) {
            this.shadowRoot.querySelector('#title-error').style.display = 'block';
            isValid = false;
        } else {
            this.shadowRoot.querySelector('#title-error').style.display = 'none';
        }

        if (!content) {
            this.shadowRoot.querySelector('#content-error').style.display = 'block';
            isValid = false;
        } else {
            this.shadowRoot.querySelector('#content-error').style.display = 'none';
        }

        return isValid;
    }

    saveNote() {
        const title = this.shadowRoot.querySelector('#note-title').value.trim();
        const content = this.shadowRoot.querySelector('#note-content').value.trim();

        if (!this.validateInputs(title, content)) {
            return;
        }

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