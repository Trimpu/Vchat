# Vchat - Quick Reference Card

## 🚀 Quick Start

```bash
# Run locally
./start.sh

# Or manually:
python3 -m http.server 8000
# Visit: http://localhost:8000
```

## 📁 File Structure

```
index.html    → UI structure
styles.css    → Glassmorphism styling
app.js        → Core functionality
```

## 🎨 Key CSS Variables

```css
--primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--glass-bg: rgba(255, 255, 255, 0.1);
--border-radius: 16px;
--spacing-md: 16px;
```

## 🔧 Main Functions (app.js)

```javascript
// Authentication
handleLogin()           // Sign in user
handleLogout()          // Sign out user
checkAuth()            // Check if signed in

// Chat Management
createNewChat()        // Create new chat
switchToChat(id)       // Switch between chats
deleteChat(id)         // Delete a chat
clearCurrentChat()     // Clear messages

// Messaging
sendMessage()          // Send user message
handleInputChange()    // Update input state
generateImage()        // Create image from text

// Storage
loadChatHistory()      // Load from Puter KV
saveChatHistory()      // Save to Puter KV

// Rendering
renderChatHistory()    // Update sidebar
renderCurrentChat()    // Update messages
renderMessage(msg)     // Render single message
```

## 🎯 Puter.js API Quick Reference

```javascript
// Auth
await puter.auth.isSignedIn()
await puter.auth.getUser()
await puter.ui.authenticateWithPuter()
await puter.auth.signOut()

// AI
await puter.ai.chat("Your message")
await puter.ai.txt2img("Description")

// Storage
await puter.kv.set("key", "value")
await puter.kv.get("key")
```

## 📊 AppState Object

```javascript
AppState = {
    currentUser: null,      // User object from Puter
    currentChatId: null,    // Active chat ID
    chats: {},             // All user chats
    isSignedIn: false,     // Auth status
    isSidebarOpen: true    // UI state
}
```

## 🎨 Chat Object Structure

```javascript
chat = {
    id: "chat_1234567890",
    title: "Chat title",
    messages: [
        {
            role: "user" | "assistant",
            content: "Message text",
            timestamp: 1234567890,
            imageUrl?: "https://...",  // Optional
            error?: true               // Optional
        }
    ],
    createdAt: 1234567890,
    updatedAt: 1234567890
}
```

## 🛠️ Common Tasks

### Add New Feature Button
1. Add button to `index.html`
2. Style in `styles.css`
3. Add event listener in `setupEventListeners()`
4. Create handler function
5. Test!

### Change Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary: your-gradient;
}
```

### Add New AI Feature
```javascript
// In app.js
async function yourFeature() {
    try {
        const result = await puter.ai.yourAPI(input);
        // Handle result
    } catch (error) {
        // Handle error
    }
}
```

## 🐛 Debugging

```javascript
// Check authentication
console.log(AppState.isSignedIn);
console.log(AppState.currentUser);

// Check current chat
console.log(AppState.currentChatId);
console.log(AppState.chats[AppState.currentChatId]);

// Check storage
const stored = await puter.kv.get('vchat_history');
console.log(JSON.parse(stored));
```

## 📱 Responsive Breakpoints

```css
@media (max-width: 768px)  /* Tablet */
@media (max-width: 480px)  /* Mobile */
```

## ⚡ Performance Tips

- Messages render incrementally
- Auto-scroll handled on render
- Textarea auto-resizes
- Loading states prevent multiple requests
- Chat history saved on change

## 🔒 Security Notes

- All auth through Puter OAuth
- XSS prevention: `escapeHtml()`
- No localStorage for sensitive data
- HTTPS required for Puter.js

## 🎯 Testing Checklist

- [ ] Sign in/out
- [ ] Create new chat
- [ ] Send messages
- [ ] Generate images
- [ ] Switch chats
- [ ] Delete chats
- [ ] Clear chat
- [ ] Mobile responsive
- [ ] Chat persistence

## 📚 Resources

- Puter Docs: https://docs.puter.com
- GitHub Repo: https://github.com/Trimpu/Vchat
- Issues: https://github.com/Trimpu/Vchat/issues

---

**Pro Tip:** Use browser DevTools Console to debug Puter.js API calls!
