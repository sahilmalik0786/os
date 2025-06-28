document.addEventListener('DOMContentLoaded', function() {
    // File system structure
    const fileSystem = {
        name: 'Root',
        type: 'folder',
        children: []
    };
    
    let currentPath = [fileSystem];
    let selectedItem = null;
    
    // DOM elements
    const fileSystemEl = document.getElementById('fileSystem');
    const newItemNameEl = document.getElementById('newItemName');
    const createFileBtn = document.getElementById('createFile');
    const createFolderBtn = document.getElementById('createFolder');
    const deleteItemBtn = document.getElementById('deleteItem');
    
    // Render the file system
    function renderFileSystem() {
        fileSystemEl.innerHTML = '';
        renderFolder(currentPath[currentPath.length - 1], fileSystemEl);
    }
    
    function renderFolder(folder, parentEl) {
        folder.children.forEach(item => {
            const itemEl = document.createElement('div');
            itemEl.className = item.type === 'folder' ? 'folder-item' : 'file-item';
            itemEl.textContent = item.name;
            
            itemEl.addEventListener('click', (e) => {
                e.stopPropagation();
                // Deselect previous selection
                if (selectedItem) {
                    selectedItem.style.backgroundColor = '';
                }
                // Select new item
                selectedItem = itemEl;
                itemEl.style.backgroundColor = 'white';
            });
            
            if (item.type === 'folder') {
                itemEl.addEventListener('dblclick', () => {
                    currentPath.push(item);
                    renderFileSystem();
                });
            }
            
            parentEl.appendChild(itemEl);
        });
    }
    
    // Navigation
    fileSystemEl.addEventListener('dblclick', () => {
        if (currentPath.length > 1) {
            currentPath.pop();
            renderFileSystem();
        }
    });
    
    // Create new file
    createFileBtn.addEventListener('click', () => {
        console.log('create')
        const fileName = newItemNameEl.value.trim();
        if (fileName) {
            currentPath[currentPath.length - 1].children.push({
                name: fileName,
                type: 'file',
                content: ''
            });
            newItemNameEl.value = '';
            renderFileSystem();
        }
    });
    
    // Create new folder
    createFolderBtn.addEventListener('click', () => {
        const folderName = newItemNameEl.value.trim();
        if (folderName) {
            currentPath[currentPath.length - 1].children.push({
                name: folderName,
                type: 'folder',
                children: []
            });
            newItemNameEl.value = '';
            renderFileSystem();
        }
    });
    
    // Delete item
    deleteItemBtn.addEventListener('click', () => {
        if (selectedItem) {
            const selectedName = selectedItem.textContent;
            const currentFolder = currentPath[currentPath.length - 1];
            currentFolder.children = currentFolder.children.filter(
                item => item.name !== selectedName
            );
            selectedItem = null;
            renderFileSystem();
        }
    });
    
    // Initial render
    renderFileSystem();
});