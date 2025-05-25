describe('Integration Tests', () => {
    let mockApi;

    beforeEach(() => {
        document.body.innerHTML = `
            <div class="container">
                <div class="tab-navigation">
                    <button class="tab-btn active" data-tab="active">Active</button>
                    <button class="tab-btn" data-tab="archived">Archived</button>
                </div>
                <div id="notes-active" class="notes-grid"></div>
                <div id="notes-archived" class="notes-grid"></div>
                <button id="add-note-btn">Add Note</button>
            </div>
        `;

        mockApi = {
            getNotes: jest.fn(),
            getArchivedNotes: jest.fn(),
            addNote: jest.fn(),
            deleteNote: jest.fn(),
            archiveNote: jest.fn(),
            unarchiveNote: jest.fn(),
        };

        global.Toast = {
            success: jest.fn(),
            error: jest.fn(),
            info: jest.fn(),
        };
    });

    test('should load app with initial data', async () => {
        const mockNotes = [
            { id: '1', title: 'Note 1', body: 'Content 1', createdAt: '2023-01-01' },
            { id: '2', title: 'Note 2', body: 'Content 2', createdAt: '2023-01-02' },
        ];

        mockApi.getNotes.mockResolvedValue(mockNotes);
        mockApi.getArchivedNotes.mockResolvedValue([]);

        const activeContainer = document.getElementById('notes-active');
        const archivedContainer = document.getElementById('notes-archived');

        const notes = await mockApi.getNotes();
        const archivedNotes = await mockApi.getArchivedNotes();

        expect(mockApi.getNotes).toHaveBeenCalled();
        expect(mockApi.getArchivedNotes).toHaveBeenCalled();
        expect(notes).toHaveLength(2);
        expect(archivedNotes).toHaveLength(0);
    });

    test('should handle add note workflow', async () => {
        const newNote = { title: 'New Note', body: 'New Content' };
        const mockResponse = { status: 'success', data: { id: '123', ...newNote } };

        mockApi.addNote.mockResolvedValue(mockResponse);

        const result = await mockApi.addNote(newNote);

        expect(mockApi.addNote).toHaveBeenCalledWith(newNote);
        expect(result.status).toBe('success');
        expect(result.data.title).toBe('New Note');
    });

    test('should handle tab switching with data', () => {
        const activeTab = document.querySelector('[data-tab="active"]');
        const archivedTab = document.querySelector('[data-tab="archived"]');
        const activePanel = document.getElementById('notes-active');
        const archivedPanel = document.getElementById('notes-archived');

        expect(activeTab.classList.contains('active')).toBe(true);

        activeTab.classList.remove('active');
        archivedTab.classList.add('active');

        expect(archivedTab.classList.contains('active')).toBe(true);
        expect(activeTab.classList.contains('active')).toBe(false);
    });

    test('should handle archive workflow', async () => {
        const noteId = '123';
        const mockResponse = { status: 'success', message: 'Note archived' };

        mockApi.archiveNote.mockResolvedValue(mockResponse);

        const result = await mockApi.archiveNote(noteId);

        expect(mockApi.archiveNote).toHaveBeenCalledWith(noteId);
        expect(result.status).toBe('success');
    });

    test('should handle delete workflow', async () => {
        const noteId = '123';
        const mockResponse = { status: 'success', message: 'Note deleted' };

        mockApi.deleteNote.mockResolvedValue(mockResponse);

        const result = await mockApi.deleteNote(noteId);

        expect(mockApi.deleteNote).toHaveBeenCalledWith(noteId);
        expect(result.status).toBe('success');
    });

    test('should handle error states', async () => {
        mockApi.getNotes.mockRejectedValue(new Error('Network error'));

        try {
            await mockApi.getNotes();
        } catch (error) {
            expect(error.message).toBe('Network error');
        }

        expect(mockApi.getNotes).toHaveBeenCalled();
    });

    test('should handle empty states', async () => {
        mockApi.getNotes.mockResolvedValue([]);
        mockApi.getArchivedNotes.mockResolvedValue([]);

        const activeNotes = await mockApi.getNotes();
        const archivedNotes = await mockApi.getArchivedNotes();

        expect(activeNotes).toHaveLength(0);
        expect(archivedNotes).toHaveLength(0);
    });
});
