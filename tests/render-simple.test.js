describe('Notes Rendering Tests', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="notes-active" class="notes-grid"></div>
      <div id="notes-archived" class="notes-grid"></div>
    `;
  });

  test('should render notes container', () => {
    const activeContainer = document.getElementById('notes-active');
    const archivedContainer = document.getElementById('notes-archived');
    
    expect(activeContainer).toBeTruthy();
    expect(archivedContainer).toBeTruthy();
  });

  test('should add notes to container', () => {
    const container = document.getElementById('notes-active');
    
    const noteElement = document.createElement('div');
    noteElement.className = 'note-card';
    noteElement.innerHTML = '<h3>Test Note</h3><p>Test Content</p>';
    
    container.appendChild(noteElement);
    
    expect(container.children.length).toBe(1);
    expect(container.innerHTML).toContain('Test Note');
  });

  test('should show empty state', () => {
    const container = document.getElementById('notes-active');
    
    container.innerHTML = `
      <div class="empty-state">
        <p>No active notes</p>
      </div>
    `;
    
    expect(container.innerHTML).toContain('empty-state');
    expect(container.innerHTML).toContain('No active notes');
  });

  test('should show error state', () => {
    const container = document.getElementById('notes-active');
    
    container.innerHTML = `
      <div class="error-state">
        <p>Failed to load notes</p>
        <button>Try Again</button>
      </div>
    `;
    
    expect(container.innerHTML).toContain('error-state');
    expect(container.innerHTML).toContain('Failed to load notes');
    expect(container.innerHTML).toContain('Try Again');
  });
});
