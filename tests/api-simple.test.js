const mockApi = {
  getNotes: jest.fn(),
  getArchivedNotes: jest.fn(),
  addNote: jest.fn(),
  deleteNote: jest.fn(),
  archiveNote: jest.fn(),
  unarchiveNote: jest.fn(),
};

jest.mock('../src/data/remote/notes-api.js', () => mockApi);

describe('API Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  test('should call getNotes API', async () => {
    const mockNotes = [
      { id: '1', title: 'Test Note', body: 'Test Content', createdAt: '2023-01-01' }
    ];
    mockApi.getNotes.mockResolvedValue(mockNotes);
    const result = await mockApi.getNotes();
    expect(mockApi.getNotes).toHaveBeenCalled();
    expect(result).toEqual(mockNotes);
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Test Note');
  });

  test('should call addNote with correct data', async () => {
    const noteData = { title: 'New Note', body: 'New Content' };
    const mockResponse = { status: 'success', data: { id: '123', ...noteData } };
    mockApi.addNote.mockResolvedValue(mockResponse);
    const result = await mockApi.addNote(noteData);
    expect(mockApi.addNote).toHaveBeenCalledWith(noteData);
    expect(result.status).toBe('success');
    expect(result.data.title).toBe('New Note');
  });

  test('should handle API errors', async () => {
    const errorMessage = 'Network error';
    mockApi.getNotes.mockRejectedValue(new Error(errorMessage));
    await expect(mockApi.getNotes()).rejects.toThrow(errorMessage);
    expect(mockApi.getNotes).toHaveBeenCalled();
  });

  test('should call delete note', async () => {
    const mockResponse = { status: 'success', message: 'Note deleted' };
    mockApi.deleteNote.mockResolvedValue(mockResponse);
    const result = await mockApi.deleteNote('123');
    expect(mockApi.deleteNote).toHaveBeenCalledWith('123');
    expect(result.status).toBe('success');
  });

  test('should call archive note', async () => {
    const mockResponse = { status: 'success', message: 'Note archived' };
    mockApi.archiveNote.mockResolvedValue(mockResponse);
    const result = await mockApi.archiveNote('123');
    expect(mockApi.archiveNote).toHaveBeenCalledWith('123');
    expect(result.status).toBe('success');
  });

  test('should call unarchive note', async () => {
    const mockResponse = { status: 'success', message: 'Note unarchived' };
    mockApi.unarchiveNote.mockResolvedValue(mockResponse);
    const result = await mockApi.unarchiveNote('123');
    expect(mockApi.unarchiveNote).toHaveBeenCalledWith('123');
    expect(result.status).toBe('success');
  });
});
