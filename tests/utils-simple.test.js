describe('Utility Functions Tests', () => {
    test('should format date correctly', () => {
        const dateString = '2023-01-01T12:00:00.000Z';
        const date = new Date(dateString);
        const formatted = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        expect(formatted).toContain('2023');
        expect(formatted).toContain('January');
    });

    test('should truncate long text', () => {
        const longText = 'This is a very long text that should be truncated to fit in the note card display area';
        const maxLength = 50;
        const truncated = longText.length > maxLength 
            ? longText.substring(0, maxLength) + '...'
            : longText;
        expect(truncated.length).toBeLessThanOrEqual(maxLength + 3);
        expect(truncated).toContain('...');
    });

    test('should validate note data', () => {
        const validNote = { title: 'Test', body: 'Content' };
        const invalidNote1 = { title: '', body: 'Content' };
        const invalidNote2 = { title: 'Test', body: '' };
        const invalidNote3 = {};
        const isValid = (note) => {
            return !!(note && 
                                note.title && 
                                note.title.trim() && 
                                note.body && 
                                note.body.trim());
        };
        expect(isValid(validNote)).toBe(true);
        expect(isValid(invalidNote1)).toBe(false);
        expect(isValid(invalidNote2)).toBe(false);
        expect(isValid(invalidNote3)).toBe(false);
    });

    test('should validate note data with detailed checks', () => {
        const testCases = [
            { note: { title: 'Valid', body: 'Valid content' }, expected: true },
            { note: { title: '', body: 'Content' }, expected: false },
            { note: { title: 'Title', body: '' }, expected: false },
            { note: { title: '   ', body: 'Content' }, expected: false },
            { note: { title: 'Title', body: '   ' }, expected: false },
            { note: {}, expected: false },
            { note: null, expected: false },
            { note: undefined, expected: false },
        ];

        const validateNote = (note) => {
            if (!note || typeof note !== 'object') return false;
            if (!note.title || typeof note.title !== 'string' || !note.title.trim()) return false;
            if (!note.body || typeof note.body !== 'string' || !note.body.trim()) return false;
            return true;
        };

        testCases.forEach(({ note, expected }, index) => {
            expect(validateNote(note)).toBe(expected);
        });
    });

    test('should generate unique IDs', () => {
        const generateId = () => {
            return Date.now().toString() + Math.random().toString(36).substr(2, 9);
        };
        const id1 = generateId();
        const id2 = generateId();
        expect(id1).toBeTruthy();
        expect(id2).toBeTruthy();
        expect(id1).not.toBe(id2);
        expect(typeof id1).toBe('string');
        expect(typeof id2).toBe('string');
    });

    test('should handle search functionality', () => {
        const notes = [
            { id: '1', title: 'JavaScript Notes', body: 'Learn JS basics' },
            { id: '2', title: 'CSS Tips', body: 'Styling techniques' },
            { id: '3', title: 'HTML Structure', body: 'Basic HTML elements' },
        ];
        const searchTerm = 'javascript';
        const filteredNotes = notes.filter(note => 
            note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            note.body.toLowerCase().includes(searchTerm.toLowerCase())
        );
        expect(filteredNotes).toHaveLength(1);
        expect(filteredNotes[0].title).toBe('JavaScript Notes');
    });

    test('should sort notes by date', () => {
        const notes = [
            { id: '1', title: 'Note 1', createdAt: '2023-01-03T00:00:00Z' },
            { id: '2', title: 'Note 2', createdAt: '2023-01-01T00:00:00Z' },
            { id: '3', title: 'Note 3', createdAt: '2023-01-02T00:00:00Z' },
        ];
        const sortedNotes = [...notes].sort((a, b) => 
            new Date(b.createdAt) - new Date(a.createdAt)
        );
        expect(sortedNotes[0].title).toBe('Note 1');
        expect(sortedNotes[1].title).toBe('Note 3');
        expect(sortedNotes[2].title).toBe('Note 2');
    });

    test('should handle empty arrays in search', () => {
        const notes = [];
        const searchTerm = 'test';
        const filteredNotes = notes.filter(note => 
            note.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        expect(filteredNotes).toHaveLength(0);
        expect(Array.isArray(filteredNotes)).toBe(true);
    });

    test('should sanitize HTML input', () => {
        const dangerousInput = '<script>alert("xss")</script>Hello World';
        const sanitized = dangerousInput
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        expect(sanitized).not.toContain('<script>');
        expect(sanitized).toContain('Hello World');
    });
});
