class Header extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  _updateStyle() {
    this._style.textContent = `
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
    this._shadowRoot.innerHTML += `
            <header>
                <h1>Notes</h1>
                <new-note-button></new-note-button>
            </header>
        `;
  }
}

customElements.define('app-header', Header);
