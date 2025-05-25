class Toast extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.show();
  }

  static success(message, duration = 3000) {
    Toast.show(message, 'success', duration);
  }

  static error(message, duration = 4000) {
    Toast.show(message, 'error', duration);
  }

  static info(message, duration = 3000) {
    Toast.show(message, 'info', duration);
  }

  static warning(message, duration = 3500) {
    Toast.show(message, 'warning', duration);
  }

  static show(message, type = 'info', duration = 3000) {
    const toast = document.createElement('toast-notification');
    toast.setAttribute('message', message);
    toast.setAttribute('type', type);
    toast.setAttribute('duration', duration);
    document.body.appendChild(toast);
  }

  show() {
    const duration = parseInt(this.getAttribute('duration')) || 3000;

    setTimeout(() => {
      this.hide();
    }, duration);
  }

  hide() {
    const container = this._shadowRoot.querySelector('.toast-container');
    if (container) {
      container.classList.add('toast-exit');
      setTimeout(() => {
        this.remove();
      }, 300);
    }
  }

  render() {
    const message = this.getAttribute('message') || '';
    const type = this.getAttribute('type') || 'info';

    this._shadowRoot.innerHTML = `
            <style>
                .toast-container {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 16px 24px;
                    border-radius: 12px;
                    color: white;
                    font-weight: 500;
                    z-index: 9999;
                    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
                    backdrop-filter: blur(10px);
                    animation: toastSlideIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    max-width: 350px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                }
                
                .toast-container.success {
                    background: linear-gradient(135deg, #28a745, #20c997);
                }
                
                .toast-container.error {
                    background: linear-gradient(135deg, #dc3545, #e83e8c);
                }
                
                .toast-container.info {
                    background: linear-gradient(135deg, #007bff, #6f42c1);
                }
                
                .toast-container.warning {
                    background: linear-gradient(135deg, #ffc107, #fd7e14);
                    color: #212529;
                }
                
                .toast-icon {
                    font-size: 20px;
                    flex-shrink: 0;
                }
                
                .toast-message {
                    flex-grow: 1;
                    font-size: 14px;
                    line-height: 1.4;
                }
                
                .toast-exit {
                    animation: toastSlideOut 0.3s ease-in-out forwards;
                }
                
                @keyframes toastSlideIn {
                    from {
                        transform: translateX(100%) scale(0.8);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0) scale(1);
                        opacity: 1;
                    }
                }
                
                @keyframes toastSlideOut {
                    from {
                        transform: translateX(0) scale(1);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%) scale(0.8);
                        opacity: 0;
                    }
                }
            </style>
            <div class="toast-container ${type}">
                <div class="toast-icon">${this.getIcon(type)}</div>
                <div class="toast-message">${message}</div>
            </div>
        `;
  }

  getIcon(type) {
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️',
    };
    return icons[type] || icons.info;
  }
}

customElements.define('toast-notification', Toast);

window.Toast = Toast;
