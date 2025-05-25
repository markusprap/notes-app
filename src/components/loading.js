class LoadingIndicator extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    min-height: 200px;
                }
                
                .loading-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 200px;
                    padding: 40px;
                    color: #6c757d;
                }
                
                .spinner {
                    width: 40px;
                    height: 40px;
                    border: 4px solid #f3f3f3;
                    border-top: 4px solid #007bff;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin-bottom: 16px;
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                .loading-text {
                    font-size: 14px;
                    font-weight: 500;
                    margin-bottom: 8px;
                }
                
                .loading-subtitle {
                    font-size: 12px;
                    color: #adb5bd;
                }
            </style>
            <div class="loading-container">
                <div class="spinner"></div>
                <div class="loading-text">${this.getAttribute('message') || 'Loading...'}</div>
                <div class="loading-subtitle">${this.getAttribute('subtitle') || 'Please wait while we fetch your data'}</div>
            </div>
        `;
  }
}

customElements.define('loading-indicator', LoadingIndicator);
