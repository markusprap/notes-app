class NewNoteButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
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
                }
                .btn:hover {
                    background-color: #333;
                }
                .icon {
                    width: 16px;
                    height: 16px;
                }
            </style>
            <button id="new-note-btn" class="btn primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
                    <path d="M5 12h14"></path>
                    <path d="M12 5v14"></path>
                </svg>
                New Note
            </button>
        `;

        this.shadowRoot.querySelector('#new-note-btn').addEventListener('click', () => {
            const modal = document.querySelector('note-modal');
            if (modal) {
                modal.show();
            }
        });
    }
}

customElements.define('new-note-button', NewNoteButton);