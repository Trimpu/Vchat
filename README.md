# Vchat 💬

A modern, AI-powered chat application with a beautiful iOS-style glassmorphism UI. Built with [Puter.js](https://puter.com) for seamless AI capabilities including chat, text-to-image generation, and more.

![Vchat](https://img.shields.io/badge/Powered%20by-Puter.js-667eea?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-success?style=for-the-badge)

## ✨ Features

- 🤖 **AI Chat** - Intelligent conversations powered by Puter AI
- 🎨 **Text to Image** - Generate beautiful images from text descriptions
- 💾 **Persistent Storage** - Your chats are saved using Puter's KV store
- 🔐 **Secure Authentication** - Sign in with Puter for secure access
- 📱 **Responsive Design** - Beautiful on all devices
- 🎭 **Modern UI** - iOS-style glassmorphism design with smooth animations
- 📝 **Chat History** - Sidebar with all your conversations
- ⚡ **Fast & Lightweight** - No backend required!

## 🚀 Live Demo

Visit the live demo: [Your GitHub Pages URL]

## 🛠️ Technologies Used

- **HTML5** - Structure
- **CSS3** - Modern glassmorphism styling with animations
- **JavaScript (ES6+)** - Interactive functionality
- **Puter.js** - AI capabilities, authentication, and storage

## 📦 Puter.js Features Used

- `puter.auth` - User authentication
- `puter.ai.chat()` - AI chat responses
- `puter.ai.txt2img()` - Text-to-image generation
- `puter.kv` - Key-value storage for chat history

## 🏃‍♂️ Quick Start

### Option 1: Use GitHub Pages (Recommended)

1. Fork this repository
2. Go to Settings → Pages
3. Select "main" branch as source
4. Visit your GitHub Pages URL

### Option 2: Run Locally

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/Vchat.git
cd Vchat
```

2. Open with a local server:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx http-server

# Or simply open index.html in your browser
```

3. Visit `http://localhost:8000` in your browser

## 📖 Usage

1. **Sign In**: Click "Sign in with Puter" to authenticate
2. **Start Chatting**: Type your message and press Enter or click Send
3. **Generate Images**: Click the 🎨 button to create images from text
4. **Manage Chats**: Create new chats, switch between them, or delete old ones
5. **Voice Input**: 🎤 (Coming soon - will use Puter's speech2txt)

## 🎨 UI Features

- **Glassmorphism Design** - Modern frosted glass effect
- **Smooth Animations** - Delightful transitions and interactions
- **Dark Theme** - Easy on the eyes
- **Responsive Layout** - Works on mobile, tablet, and desktop
- **Chat History Sidebar** - Easy navigation between conversations

## 🔮 Future Enhancements

- 🎤 **Speech to Text** - Voice input using `puter.ai.speech2txt()`
- 🔊 **Text to Speech** - Hear responses with `puter.ai.txt2speech()`
- 🎥 **Text to Video** - Generate videos with `puter.ai.txt2vid()`
- 📸 **Image Analysis** - Describe images with `puter.ai.img2txt()`
- 📎 **File Uploads** - Using Puter's cloud storage
- 🌐 **Multi-language Support** - Internationalization
- 🎭 **Custom Themes** - Personalize your experience

## 📄 Project Structure

```
Vchat/
├── index.html      # Main HTML structure
├── styles.css      # Glassmorphism styling
├── app.js          # Core functionality
└── README.md       # Documentation
```

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Puter.js](https://puter.com) - For the amazing AI and cloud platform
- Inspired by ChatGPT's clean interface
- iOS design language for the glassmorphism aesthetic

## 📧 Contact

Created by [@Trimpu](https://github.com/Trimpu)

---

**Note**: This app requires a Puter account to function. Sign up for free at [puter.com](https://puter.com).