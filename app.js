// ===== App State =====
const AppState = {
    currentUser: null,
    currentChatId: null,
    chats: {},
    isSignedIn: false,
    isSidebarOpen: true
};

// ===== DOM Elements =====
const elements = {
    // Screens
    loadingScreen: null,
    loginScreen: null,
    mainApp: null,
    welcomeScreen: null,
    chatMessages: null,
    
    // Buttons
    loginBtn: null,
    logoutBtn: null,
    newChatBtn: null,
    sendBtn: null,
    imageBtn: null,
    voiceBtn: null,
    toggleSidebar: null,
    clearChatBtn: null,
    
    // Inputs
    messageInput: null,
    imagePrompt: null,
    
    // Containers
    chatHistory: null,
    userProfile: null,
    userName: null,
    userEmail: null,
    chatTitle: null,
    
    // Modal
    imageModal: null,
    closeImageModal: null,
    cancelImageBtn: null,
    generateImageBtn: null
};

// ===== Initialization =====
document.addEventListener('DOMContentLoaded', async () => {
    initializeElements();
    setupEventListeners();
    await checkAuth();
});

function initializeElements() {
    // Screens
    elements.loadingScreen = document.getElementById('loadingScreen');
    elements.loginScreen = document.getElementById('loginScreen');
    elements.mainApp = document.getElementById('mainApp');
    elements.welcomeScreen = document.getElementById('welcomeScreen');
    elements.chatMessages = document.getElementById('chatMessages');
    
    // Buttons
    elements.loginBtn = document.getElementById('loginBtn');
    elements.logoutBtn = document.getElementById('logoutBtn');
    elements.newChatBtn = document.getElementById('newChatBtn');
    elements.sendBtn = document.getElementById('sendBtn');
    elements.imageBtn = document.getElementById('imageBtn');
    elements.voiceBtn = document.getElementById('voiceBtn');
    elements.toggleSidebar = document.getElementById('toggleSidebar');
    elements.clearChatBtn = document.getElementById('clearChatBtn');
    
    // Inputs
    elements.messageInput = document.getElementById('messageInput');
    elements.imagePrompt = document.getElementById('imagePrompt');
    
    // Containers
    elements.chatHistory = document.getElementById('chatHistory');
    elements.userProfile = document.getElementById('userProfile');
    elements.userName = document.getElementById('userName');
    elements.userEmail = document.getElementById('userEmail');
    elements.chatTitle = document.getElementById('chatTitle');
    
    // Modal
    elements.imageModal = document.getElementById('imageModal');
    elements.closeImageModal = document.getElementById('closeImageModal');
    elements.cancelImageBtn = document.getElementById('cancelImageBtn');
    elements.generateImageBtn = document.getElementById('generateImageBtn');
}

// ===== Event Listeners =====
function setupEventListeners() {
    // Auth
    elements.loginBtn.addEventListener('click', handleLogin);
    elements.logoutBtn.addEventListener('click', handleLogout);
    
    // Chat
    elements.newChatBtn.addEventListener('click', createNewChat);
    elements.sendBtn.addEventListener('click', sendMessage);
    elements.messageInput.addEventListener('input', handleInputChange);
    elements.messageInput.addEventListener('keydown', handleKeyPress);
    elements.clearChatBtn.addEventListener('click', clearCurrentChat);
    
    // Image Generation
    elements.imageBtn.addEventListener('click', openImageModal);
    elements.closeImageModal.addEventListener('click', closeImageModal);
    elements.cancelImageBtn.addEventListener('click', closeImageModal);
    elements.generateImageBtn.addEventListener('click', generateImage);
    
    // Voice (placeholder for future implementation)
    elements.voiceBtn.addEventListener('click', handleVoiceInput);
    
    // Sidebar
    elements.toggleSidebar.addEventListener('click', toggleSidebar);
    
    // Capability cards
    document.querySelectorAll('.capability-card').forEach(card => {
        card.addEventListener('click', () => {
            const prompt = card.getAttribute('data-prompt');
            if (prompt) {
                elements.messageInput.value = prompt;
                handleInputChange();
            }
        });
    });
}

// ===== Authentication =====
async function checkAuth() {
    try {
        // Check if user is already signed in
        const isSignedIn = await puter.auth.isSignedIn();
        
        if (isSignedIn) {
            const user = await puter.auth.getUser();
            await handleAuthSuccess(user);
        } else {
            showLoginScreen();
        }
    } catch (error) {
        console.error('Auth check error:', error);
        showLoginScreen();
    }
}

async function handleLogin() {
    try {
        elements.loginBtn.disabled = true;
        elements.loginBtn.innerHTML = '<span>Signing in...</span>';
        
        // Sign in with Puter
        await puter.ui.authenticateWithPuter();
        
        // Get user info
        const user = await puter.auth.getUser();
        await handleAuthSuccess(user);
    } catch (error) {
        console.error('Login error:', error);
        alert('Failed to sign in. Please try again.');
        elements.loginBtn.disabled = false;
        elements.loginBtn.innerHTML = '<span>Sign in with Puter</span><span class="btn-arrow">→</span>';
    }
}

async function handleAuthSuccess(user) {
    AppState.currentUser = user;
    AppState.isSignedIn = true;
    
    // Update UI with user info
    elements.userName.textContent = user.username || 'User';
    elements.userEmail.textContent = user.email || '';
    
    // Load chat history from KV store
    await loadChatHistory();
    
    // Show main app
    showMainApp();
}

async function handleLogout() {
    try {
        await puter.auth.signOut();
        AppState.currentUser = null;
        AppState.isSignedIn = false;
        AppState.chats = {};
        AppState.currentChatId = null;
        
        // Clear UI
        elements.chatHistory.innerHTML = '';
        elements.chatMessages.innerHTML = '';
        
        showLoginScreen();
    } catch (error) {
        console.error('Logout error:', error);
        alert('Failed to log out. Please try again.');
    }
}

// ===== Screen Management =====
function showLoginScreen() {
    elements.loadingScreen.classList.add('hidden');
    elements.loginScreen.classList.remove('hidden');
    elements.mainApp.classList.add('hidden');
}

function showMainApp() {
    elements.loadingScreen.classList.add('hidden');
    elements.loginScreen.classList.add('hidden');
    elements.mainApp.classList.remove('hidden');
    
    // If no chats exist, show welcome screen
    if (Object.keys(AppState.chats).length === 0) {
        createNewChat();
    }
}

// ===== Chat Management =====
function createNewChat() {
    const chatId = `chat_${Date.now()}`;
    const chat = {
        id: chatId,
        title: 'New Chat',
        messages: [],
        createdAt: Date.now(),
        updatedAt: Date.now()
    };
    
    AppState.chats[chatId] = chat;
    AppState.currentChatId = chatId;
    
    // Update UI
    renderChatHistory();
    renderCurrentChat();
    elements.messageInput.focus();
    
    // Save to storage
    saveChatHistory();
}

function switchToChat(chatId) {
    if (AppState.chats[chatId]) {
        AppState.currentChatId = chatId;
        renderCurrentChat();
        renderChatHistory();
    }
}

function deleteChat(chatId) {
    if (confirm('Are you sure you want to delete this chat?')) {
        delete AppState.chats[chatId];
        
        if (AppState.currentChatId === chatId) {
            const chatIds = Object.keys(AppState.chats);
            if (chatIds.length > 0) {
                switchToChat(chatIds[0]);
            } else {
                createNewChat();
            }
        }
        
        renderChatHistory();
        saveChatHistory();
    }
}

function clearCurrentChat() {
    if (AppState.currentChatId && AppState.chats[AppState.currentChatId]) {
        if (confirm('Are you sure you want to clear this chat?')) {
            AppState.chats[AppState.currentChatId].messages = [];
            AppState.chats[AppState.currentChatId].title = 'New Chat';
            AppState.chats[AppState.currentChatId].updatedAt = Date.now();
            renderCurrentChat();
            renderChatHistory();
            saveChatHistory();
        }
    }
}

// ===== Message Handling =====
async function sendMessage() {
    const message = elements.messageInput.value.trim();
    if (!message || !AppState.currentChatId) return;
    
    const chat = AppState.chats[AppState.currentChatId];
    
    // Add user message
    chat.messages.push({
        role: 'user',
        content: message,
        timestamp: Date.now()
    });
    
    // Update chat title if it's the first message
    if (chat.messages.length === 1) {
        chat.title = message.substring(0, 50) + (message.length > 50 ? '...' : '');
    }
    
    chat.updatedAt = Date.now();
    
    // Clear input
    elements.messageInput.value = '';
    handleInputChange();
    
    // Hide welcome screen
    elements.welcomeScreen.classList.add('hidden');
    
    // Render messages
    renderCurrentChat();
    renderChatHistory();
    
    // Show loading
    addLoadingMessage();
    
    try {
        // Call Puter AI
        const response = await puter.ai.chat(message);
        
        // Remove loading
        removeLoadingMessage();
        
        // Handle response - convert to string if it's an object
        let responseText = response;
        if (typeof response === 'object') {
            // If it's a ChatResponse object, extract the text
            responseText = response.message || response.text || response.content || JSON.stringify(response);
        }
        
        // Add assistant message
        chat.messages.push({
            role: 'assistant',
            content: responseText,
            timestamp: Date.now()
        });
        
        renderCurrentChat();
        saveChatHistory();
    } catch (error) {
        console.error('Chat error:', error);
        removeLoadingMessage();
        
        // Add error message
        chat.messages.push({
            role: 'assistant',
            content: 'Sorry, I encountered an error. Please try again.',
            timestamp: Date.now(),
            error: true
        });
        
        renderCurrentChat();
    }
}

function handleInputChange() {
    const hasContent = elements.messageInput.value.trim().length > 0;
    elements.sendBtn.disabled = !hasContent;
    
    // Auto-resize textarea
    elements.messageInput.style.height = 'auto';
    elements.messageInput.style.height = elements.messageInput.scrollHeight + 'px';
}

function handleKeyPress(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (!elements.sendBtn.disabled) {
            sendMessage();
        }
    }
}

// ===== Image Generation =====
function openImageModal() {
    elements.imageModal.classList.remove('hidden');
    elements.imagePrompt.focus();
}

function closeImageModal() {
    elements.imageModal.classList.add('hidden');
    elements.imagePrompt.value = '';
}

async function generateImage() {
    const prompt = elements.imagePrompt.value.trim();
    if (!prompt || !AppState.currentChatId) return;
    
    const chat = AppState.chats[AppState.currentChatId];
    
    // Close modal
    closeImageModal();
    
    // Hide welcome screen
    elements.welcomeScreen.classList.add('hidden');
    
    // Add user message
    chat.messages.push({
        role: 'user',
        content: `🎨 Generate image: ${prompt}`,
        timestamp: Date.now()
    });
    
    chat.updatedAt = Date.now();
    
    // Update chat title if it's the first message
    if (chat.messages.length === 1) {
        chat.title = `Image: ${prompt.substring(0, 40)}...`;
    }
    
    renderCurrentChat();
    renderChatHistory();
    
    // Show loading
    addLoadingMessage();
    
    try {
        // Call Puter text-to-image AI
        const imageUrl = await puter.ai.txt2img(prompt);
        
        // Remove loading
        removeLoadingMessage();
        
        // Add assistant message with image
        chat.messages.push({
            role: 'assistant',
            content: `Here's your generated image:`,
            imageUrl: imageUrl,
            timestamp: Date.now()
        });
        
        renderCurrentChat();
        saveChatHistory();
    } catch (error) {
        console.error('Image generation error:', error);
        removeLoadingMessage();
        
        // Add error message
        chat.messages.push({
            role: 'assistant',
            content: 'Sorry, I couldn\'t generate the image. Please try again.',
            timestamp: Date.now(),
            error: true
        });
        
        renderCurrentChat();
    }
}

// ===== Voice Input (Placeholder) =====
async function handleVoiceInput() {
    try {
        alert('Voice input coming soon! This will use Puter\'s speech2txt API.');
        // Future implementation:
        // const text = await puter.ai.speech2txt(audioData);
        // elements.messageInput.value = text;
        // handleInputChange();
    } catch (error) {
        console.error('Voice input error:', error);
    }
}

// ===== Rendering =====
function renderChatHistory() {
    const chatIds = Object.keys(AppState.chats).sort((a, b) => {
        return AppState.chats[b].updatedAt - AppState.chats[a].updatedAt;
    });
    
    elements.chatHistory.innerHTML = chatIds.map(chatId => {
        const chat = AppState.chats[chatId];
        const isActive = chatId === AppState.currentChatId;
        const date = new Date(chat.updatedAt);
        const timeStr = formatTime(date);
        
        return `
            <div class="chat-history-item ${isActive ? 'active' : ''}" data-chat-id="${chatId}">
                <div class="chat-title">${escapeHtml(chat.title)}</div>
                <div class="chat-time">${timeStr}</div>
                <button class="delete-chat" data-chat-id="${chatId}">×</button>
            </div>
        `;
    }).join('');
    
    // Add event listeners
    document.querySelectorAll('.chat-history-item').forEach(item => {
        item.addEventListener('click', (e) => {
            if (!e.target.classList.contains('delete-chat')) {
                switchToChat(item.dataset.chatId);
            }
        });
    });
    
    document.querySelectorAll('.delete-chat').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteChat(btn.dataset.chatId);
        });
    });
}

function renderCurrentChat() {
    if (!AppState.currentChatId || !AppState.chats[AppState.currentChatId]) {
        elements.welcomeScreen.classList.remove('hidden');
        elements.chatMessages.innerHTML = '';
        elements.chatTitle.textContent = 'New Chat';
        return;
    }
    
    const chat = AppState.chats[AppState.currentChatId];
    elements.chatTitle.textContent = chat.title;
    
    if (chat.messages.length === 0) {
        elements.welcomeScreen.classList.remove('hidden');
        elements.chatMessages.innerHTML = '';
    } else {
        elements.welcomeScreen.classList.add('hidden');
        elements.chatMessages.innerHTML = chat.messages.map(msg => renderMessage(msg)).join('');
        
        // Scroll to bottom
        const container = elements.chatMessages.parentElement;
        container.scrollTop = container.scrollHeight;
    }
}

function renderMessage(message) {
    const isUser = message.role === 'user';
    const avatar = isUser ? '👤' : '🤖';
    const author = isUser ? 'You' : 'Vchat';
    
    // Convert message content to string if it's an object
    let contentText = message.content;
    if (typeof contentText === 'object') {
        contentText = JSON.stringify(contentText, null, 2);
    }
    
    let imageHtml = '';
    if (message.imageUrl) {
        imageHtml = `
            <div class="message-image">
                <img src="${message.imageUrl}" alt="Generated image" loading="lazy">
                <div class="image-actions">
                    <button class="btn-image-action" onclick="downloadImage('${message.imageUrl}')" title="Download Image">
                        <span>⬇️</span> Download
                    </button>
                    <button class="btn-image-action" onclick="openImageInNewTab('${message.imageUrl}')" title="Open in New Tab">
                        <span>🔗</span> Open
                    </button>
                </div>
            </div>
        `;
    }
    
    // Add copy button for assistant messages
    const copyButton = !isUser ? `
        <button class="btn-copy-message" onclick="copyMessageText(this)" title="Copy message">
            <span>📋</span>
        </button>
    ` : '';
    
    return `
        <div class="message ${message.role}">
            <div class="message-header">
                <div class="message-avatar">${avatar}</div>
                <div class="message-author">${author}</div>
            </div>
            <div class="message-content">
                ${formatMessageContent(contentText)}
                ${imageHtml}
                ${copyButton}
            </div>
        </div>
    `;
}

function addLoadingMessage() {
    const loadingHtml = `
        <div class="message assistant" id="loadingMessage">
            <div class="message-header">
                <div class="message-avatar">🤖</div>
                <div class="message-author">Vchat</div>
            </div>
            <div class="message-loading">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
        </div>
    `;
    elements.chatMessages.insertAdjacentHTML('beforeend', loadingHtml);
    
    // Scroll to bottom
    const container = elements.chatMessages.parentElement;
    container.scrollTop = container.scrollHeight;
}

function removeLoadingMessage() {
    const loadingMsg = document.getElementById('loadingMessage');
    if (loadingMsg) {
        loadingMsg.remove();
    }
}

// ===== Storage =====
async function loadChatHistory() {
    try {
        const stored = await puter.kv.get('vchat_history');
        if (stored) {
            AppState.chats = JSON.parse(stored);
            
            // Load the most recent chat
            const chatIds = Object.keys(AppState.chats);
            if (chatIds.length > 0) {
                const sortedIds = chatIds.sort((a, b) => {
                    return AppState.chats[b].updatedAt - AppState.chats[a].updatedAt;
                });
                AppState.currentChatId = sortedIds[0];
            }
            
            renderChatHistory();
            renderCurrentChat();
        }
    } catch (error) {
        console.error('Error loading chat history:', error);
    }
}

async function saveChatHistory() {
    try {
        await puter.kv.set('vchat_history', JSON.stringify(AppState.chats));
    } catch (error) {
        console.error('Error saving chat history:', error);
    }
}

// ===== UI Helpers =====
function toggleSidebar() {
    AppState.isSidebarOpen = !AppState.isSidebarOpen;
    if (AppState.isSidebarOpen) {
        elements.mainApp.classList.remove('sidebar-collapsed');
        elements.sidebar?.classList.add('mobile-open');
    } else {
        elements.mainApp.classList.add('sidebar-collapsed');
        elements.sidebar?.classList.remove('mobile-open');
    }
}

// ===== Utility Functions =====
function formatTime(date) {
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) {
        return 'Just now';
    } else if (diff < 3600000) {
        return Math.floor(diff / 60000) + 'm ago';
    } else if (diff < 86400000) {
        return Math.floor(diff / 3600000) + 'h ago';
    } else if (diff < 604800000) {
        return Math.floor(diff / 86400000) + 'd ago';
    } else {
        return date.toLocaleDateString();
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatMessageContent(content) {
    // Basic markdown-like formatting
    let formatted = escapeHtml(content);
    
    // Bold
    formatted = formatted.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    
    // Italic
    formatted = formatted.replace(/\*(.+?)\*/g, '<em>$1</em>');
    
    // Code blocks
    formatted = formatted.replace(/```([\s\S]+?)```/g, '<pre><code>$1</code></pre>');
    
    // Inline code
    formatted = formatted.replace(/`(.+?)`/g, '<code>$1</code>');
    
    // Line breaks
    formatted = formatted.replace(/\n/g, '<br>');
    
    return formatted;
}

// Get sidebar element reference
const sidebar = document.querySelector('.sidebar');
if (sidebar) {
    elements.sidebar = sidebar;
}

// ===== Image & Copy Functions =====
function downloadImage(imageUrl) {
    fetch(imageUrl)
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `vchat-image-${Date.now()}.png`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        })
        .catch(error => {
            console.error('Download error:', error);
            // Fallback: open in new tab
            window.open(imageUrl, '_blank');
        });
}

function openImageInNewTab(imageUrl) {
    window.open(imageUrl, '_blank');
}

function copyMessageText(button) {
    const messageContent = button.parentElement;
    // Get text content, excluding the copy button itself
    const textToCopy = Array.from(messageContent.childNodes)
        .filter(node => node !== button && node.nodeType === Node.TEXT_NODE || node.nodeName !== 'BUTTON')
        .map(node => node.textContent)
        .join('')
        .trim();
    
    // Copy to clipboard
    navigator.clipboard.writeText(textToCopy).then(() => {
        // Show feedback
        const originalContent = button.innerHTML;
        button.innerHTML = '<span>✅</span>';
        button.style.background = 'rgba(74, 222, 128, 0.2)';
        
        setTimeout(() => {
            button.innerHTML = originalContent;
            button.style.background = '';
        }, 2000);
    }).catch(error => {
        console.error('Copy error:', error);
        alert('Failed to copy text');
    });
}
