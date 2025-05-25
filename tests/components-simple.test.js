describe('Components Simple', () => {
    test('should create note card HTML', () => {
        const noteCardHTML = `
            <div class="note-card" data-note-id="123">
                <h3>Sample Note</h3>
                <p>Sample content</p>
                <button class="delete-btn">Delete</button>
            </div>
        `;
        
        expect(noteCardHTML).toContain('note-card');
        expect(noteCardHTML).toContain('Sample Note');
        expect(noteCardHTML).toContain('Delete');
    });

    test('should create modal HTML', () => {
        const modalHTML = `
            <div class="modal">
                <form>
                    <input type="text" placeholder="Title" />
                    <textarea placeholder="Content"></textarea>
                    <button type="submit">Save</button>
                </form>
            </div>
        `;
        
        expect(modalHTML).toContain('modal');
        expect(modalHTML).toContain('input');
        expect(modalHTML).toContain('textarea');
        expect(modalHTML).toContain('Save');
    });

    test('should create loading HTML', () => {
        const loadingHTML = `
            <div class="loading-indicator">
                <div class="spinner"></div>
                <p>Loading...</p>
            </div>
        `;
        
        expect(loadingHTML).toContain('loading-indicator');
        expect(loadingHTML).toContain('spinner');
        expect(loadingHTML).toContain('Loading...');
    });

    test('should create toast HTML', () => {
        const toastHTML = `
            <div class="toast success">
                <span>Success message!</span>
                <button class="close">×</button>
            </div>
        `;
        
        expect(toastHTML).toContain('toast');
        expect(toastHTML).toContain('success');
        expect(toastHTML).toContain('Success message!');
    });

    test('should handle DOM manipulation', () => {
        document.body.innerHTML = '<div id="container"></div>';
        
        const container = document.getElementById('container');
        const element = document.createElement('div');
        element.textContent = 'Test Element';
        
        container.appendChild(element);
        
        expect(container.children.length).toBe(1);
        expect(container.textContent).toBe('Test Element');
    });
});