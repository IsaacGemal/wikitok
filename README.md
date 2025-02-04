# WikiTok

WikiTok is an innovative web application that presents Wikipedia articles in a TikTok-style vertical scrolling interface, making learning and discovery more engaging and interactive.

## 🌟 Features

- TikTok-style vertical scrolling interface
- Infinite scroll loading of Wikipedia articles
- Modern, clean UI with dark theme
- Responsive design for all devices
- About modal with project information
- Seamless Wikipedia article integration

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** TailwindCSS
- **Icons:** Lucide React
- **Development Tools:**
  - ESLint for code linting
  - TypeScript for type safety
  - Vite for fast development and building

## 📁 Project Structure

```
frontend/
├── public/           # Static assets
│   ├── src/
│   │   ├── assets/      # Project assets
│   │   ├── components/  # React components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── App.tsx      # Main application component
│   │   ├── main.tsx     # Application entry point
│   │   └── index.css    # Global styles
│   ├── package.json     # Project dependencies and scripts
│   └── vite.config.ts   # Vite configuration
```

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/IsaacGemal/wikitok.git
cd wikitok/frontend
```

2. Install Bun (if not already installed):
```bash
curl -fsSL https://bun.sh/install | bash
```

3. Install dependencies:
```bash
bun install
```

4. Start the development server:
```bash
bun dev
```

5. Build for production:
```bash
bun run build
```

## 🔧 Available Scripts

- `bun dev` - Start development server
- `bun run build` - Build for production
- `bun run lint` - Run ESLint
- `bun run preview` - Preview production build

## 💡 Core Features Implementation

- **Infinite Scroll**: Implemented using Intersection Observer API
- **Wikipedia Integration**: Custom hooks for fetching Wikipedia articles
- **Responsive UI**: TailwindCSS for adaptive design
- **Performance**: Optimized loading with React best practices

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the terms of the license included in the repository.

## 👨‍💻 Author

Created with ❤️ by [@Aizkmusic](https://x.com/Aizkmusic)

---

Made with modern web technologies to create an engaging way to explore Wikipedia content. 