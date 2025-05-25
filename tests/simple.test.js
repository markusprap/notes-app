describe('Simple Test', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="notes-active"></div>
      <div id="notes-archived"></div>
      <button class="tab-btn active" data-tab="active">Active</button>
      <button class="tab-btn" data-tab="archived">Archived</button>
    `;

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ status: 'success', data: [] }),
      })
    );

    global.console = { ...console, log: jest.fn(), error: jest.fn() };
  });

  test('should pass basic test', () => {
    expect(1 + 1).toBe(2);
  });

  test('should have DOM elements', () => {
    const activeContainer = document.getElementById('notes-active');
    const archivedContainer = document.getElementById('notes-archived');
    
    expect(activeContainer).toBeTruthy();
    expect(archivedContainer).toBeTruthy();
  });

  test('should mock fetch', async () => {
    const response = await fetch('test-url');
    const data = await response.json();
    
    expect(fetch).toHaveBeenCalledWith('test-url');
    expect(data.status).toBe('success');
  });
});
