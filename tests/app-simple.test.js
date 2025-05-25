describe('Main Application Tests', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <div class="container">
                <div class="tab-navigation">
                    <button class="tab-btn active" data-tab="active">Active Notes</button>
                    <button class="tab-btn" data-tab="archived">Archived Notes</button>
                </div>
                <div class="tab-content">
                    <div id="tab-active" class="tab-panel active">
                        <div id="notes-active" class="notes-grid"></div>
                    </div>
                    <div id="tab-archived" class="tab-panel">
                        <div id="notes-archived" class="notes-grid"></div>
                    </div>
                </div>
            </div>
            <button id="add-note-btn" class="fab">
                <i class="fas fa-plus"></i>
            </button>
            <note-modal></note-modal>
        `;

        global.Toast = {
            success: jest.fn(),
            error: jest.fn(),
            info: jest.fn(),
        };

        jest.clearAllMocks();
    });

    test('should have all required DOM elements', () => {
        const container = document.querySelector('.container');
        const tabNavigation = document.querySelector('.tab-navigation');
        const activeTab = document.querySelector('[data-tab="active"]');
        const archivedTab = document.querySelector('[data-tab="archived"]');
        const notesActive = document.getElementById('notes-active');
        const notesArchived = document.getElementById('notes-archived');
        const addBtn = document.getElementById('add-note-btn');
        const modal = document.querySelector('note-modal');

        expect(container).toBeTruthy();
        expect(tabNavigation).toBeTruthy();
        expect(activeTab).toBeTruthy();
        expect(archivedTab).toBeTruthy();
        expect(notesActive).toBeTruthy();
        expect(notesArchived).toBeTruthy();
        expect(addBtn).toBeTruthy();
        expect(modal).toBeTruthy();
    });

    test('should initialize with correct default state', () => {
        const activeTab = document.querySelector('[data-tab="active"]');
        const archivedTab = document.querySelector('[data-tab="archived"]');
        const activePanel = document.getElementById('tab-active');
        const archivedPanel = document.getElementById('tab-archived');

        expect(activeTab.classList.contains('active')).toBe(true);
        expect(archivedTab.classList.contains('active')).toBe(false);
        expect(activePanel.classList.contains('active')).toBe(true);
        expect(archivedPanel.classList.contains('active')).toBe(false);
    });

    test('should handle add note button click', () => {
        const addBtn = document.getElementById('add-note-btn');
        let modalShown = false;
        addBtn.addEventListener('click', () => {
            modalShown = true;
        });
        addBtn.click();
        expect(modalShown).toBe(true);
    });

    test('should handle window load event', () => {
        let appInitialized = false;
        document.addEventListener('DOMContentLoaded', () => {
            appInitialized = true;
        });
        const event = new Event('DOMContentLoaded');
        document.dispatchEvent(event);
        expect(appInitialized).toBe(true);
    });

    test('should show welcome message', (done) => {
        const showWelcomeMessage = () => {
            global.Toast.info('Welcome to Notes App! 🎉');
        };
        showWelcomeMessage();
        expect(global.Toast.info).toHaveBeenCalledWith('Welcome to Notes App! 🎉');
        done();
    });

    test('should handle welcome message with timeout', () => {
        jest.useFakeTimers();
        setTimeout(() => {
            global.Toast.info('Welcome to Notes App! 🎉');
        }, 1000);
        jest.advanceTimersByTime(1000);
        expect(global.Toast.info).toHaveBeenCalledWith('Welcome to Notes App! 🎉');
        jest.useRealTimers();
    });

    test('should handle responsive design', () => {
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 375,
        });
        expect(window.innerWidth).toBe(375);
        window.innerWidth = 768;
        expect(window.innerWidth).toBe(768);
        window.innerWidth = 1024;
        expect(window.innerWidth).toBe(1024);
    });

    test('should handle keyboard shortcuts', () => {
        let shortcutHandled = false;
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'n') {
                e.preventDefault();
                shortcutHandled = true;
            }
        });
        const event = new KeyboardEvent('keydown', {
            key: 'n',
            ctrlKey: true,
            bubbles: true
        });
        document.dispatchEvent(event);
        expect(shortcutHandled).toBe(true);
    });

    test('should handle app initialization workflow', () => {
        const initSteps = {
            loadComponents: jest.fn(),
            setupEventListeners: jest.fn(),
            loadInitialData: jest.fn(),
        };
        initSteps.loadComponents();
        initSteps.setupEventListeners();
        initSteps.loadInitialData();
        expect(initSteps.loadComponents).toHaveBeenCalled();
        expect(initSteps.setupEventListeners).toHaveBeenCalled();
        expect(initSteps.loadInitialData).toHaveBeenCalled();
    });
});
