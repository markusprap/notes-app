class Header extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem;
                    background-color: #f8f9fa;
                    border-bottom: 1px solid #ddd;
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                }
                h1 {
                    margin: 0;
                    font-size: 1.5rem;
                }
            </style>
            <header>
                <h1>Notes</h1>
                <new-note-button></new-note-button>
            </header>
        `;
    }
}

customElements.define('app-header', Header);