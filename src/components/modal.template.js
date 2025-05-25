export const modalTemplate = `
    <div class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2 id="modal-title">Create a new note</h2>
                <button class="close-btn">X</button>
            </div>
            <form id="note-form">
                <div class="modal-body">
                    <input id="note-title" type="text" placeholder="Enter note title" />
                    <div id="title-error" class="error" style="display:none;">Title is required.</div>
                    <textarea id="note-content" placeholder="What's on your mind?"></textarea>
                    <div id="content-error" class="error" style="display:none;">Content is required.</div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn-primary" id="save-note">Save Note</button>
                </div>
            </form>
        </div>
    </div>
`;
