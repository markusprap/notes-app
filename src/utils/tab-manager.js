export class TabManager {
  constructor() {
    this.activeTab = 'active';
    this.init();
  }

  init() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.dataset.tab;
        this.switchTab(targetTab, tabBtns, tabPanels);
      });
    });
  }

  switchTab(targetTab, tabBtns, tabPanels) {
    this.activeTab = targetTab;

    tabBtns.forEach(b => b.classList.remove('active'));
    document.querySelector(`[data-tab="${targetTab}"]`).classList.add('active');

    tabPanels.forEach(panel => {
      panel.classList.remove('active');
      if (panel.id === `${targetTab}-panel`) {
        panel.classList.add('active');
      }
    });

    document.dispatchEvent(
      new CustomEvent('tab-changed', {
        detail: { activeTab: targetTab },
      })
    );
  }

  getCurrentTab() {
    return this.activeTab;
  }
}
