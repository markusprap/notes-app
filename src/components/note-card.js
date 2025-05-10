class NoteCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    set noteData(note) {
        this.render(note);
    }

    render(note) {
        this.shadowRoot.innerHTML = `
            <style>
                .note-card {
                    background-color: white;
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                    padding: 16px;
                    margin: 10px;
                    display: flex;
                    flex-direction: column;
                }
                .note-title {
                    font-size: 18px;
                    font-weight: bold;
                    margin-bottom: 8px;
                }
                .note-body {
                    font-size: 16px;
                    color: #333;
                }
                .note-date {
                    font-size: 14px;
                    color: #666;
                    margin-top: 10px;
                }
            </style>
            <div class="note-card">
                <div class="note-title">${note.title}</div>
                <div class="note-body">${note.body}</div>
                <div class="note-date">${new Date(note.createdAt).toLocaleDateString()}</div>
            </div>
        `;
    }
}

customElements.define('note-card', NoteCard);