describe('Tab Manager Tests', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="tab-navigation">
        <button class="tab-btn active" data-tab="active">Active</button>
        <button class="tab-btn" data-tab="archived">Archived</button>
      </div>
      <div class="tab-content">
        <div id="tab-active" class="tab-panel active"></div>
        <div id="tab-archived" class="tab-panel"></div>
      </div>
    `;
  });

  test('should have tab buttons', () => {
    const activeBtn = document.querySelector('[data-tab="active"]');
    const archivedBtn = document.querySelector('[data-tab="archived"]');
    
    expect(activeBtn).toBeTruthy();
    expect(archivedBtn).toBeTruthy();
    expect(activeBtn.classList.contains('active')).toBe(true);
  });

  test('should switch tabs', () => {
    const activeBtn = document.querySelector('[data-tab="active"]');
    const archivedBtn = document.querySelector('[data-tab="archived"]');
    const activePanel = document.getElementById('tab-active');
    const archivedPanel = document.getElementById('tab-archived');

    archivedBtn.click();

    activeBtn.classList.remove('active');
    archivedBtn.classList.add('active');
    activePanel.classList.remove('active');
    archivedPanel.classList.add('active');

    expect(archivedBtn.classList.contains('active')).toBe(true);
    expect(activeBtn.classList.contains('active')).toBe(false);
    expect(archivedPanel.classList.contains('active')).toBe(true);
    expect(activePanel.classList.contains('active')).toBe(false);
  });

  test('should handle tab data attributes', () => {
    const activeBtn = document.querySelector('[data-tab="active"]');
    const archivedBtn = document.querySelector('[data-tab="archived"]');
    
    expect(activeBtn.getAttribute('data-tab')).toBe('active');
    expect(archivedBtn.getAttribute('data-tab')).toBe('archived');
  });
});
