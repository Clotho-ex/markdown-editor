# 📝 Markdown Editor

A modern, responsive markdown editor built with React, featuring real-time preview, syntax highlighting, and a clean interface.

![Markdown Editor Screenshot](/image.png)

## ✨ Features  

### Core Functionality

- **Real-time Preview** - See your markdown rendered instantly with debounced processing.
- **Split Layout** - Side-by-side editor and preview on desktop, switchable on mobile.
- **Syntax Highlighting** - Code blocks with syntax highlighting using highlight.js
- **Math Support** - Render mathematical expressions with KaTeX
- **GitHub Flavored Markdown** - Full GFM support including tables, strikethrough, and more.
- **Copy Code Blocks** - One-click copy functionality with visual feedback.

### User Experience

- **Dark/Light Theme** - Automatic theme switching with system preference.
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices.
- **Keyboard Shortcuts** - Fast navigation and actions.
- **File Management** - Editable filenames with validation and download.
- **Auto-save** - Automatic local storage persistence.
- **Performance Optimized** - Debounced rendering and memoized components.

### Technical Features

- **Modern React** - Built with React 18+ and modern hooks.
- **TypeScript Ready** - ESLint configured for type safety.
- **Fast Build** - Vite for lightning-fast development and building.
- **Accessible** - ARIA labels and keyboard navigation support.

## 🚀 Quick Start

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Clotho-ex/markdown-editor.git
cd markdown-editor

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
npm run preview
```

## 🎮 Usage

### Basic Editing

1. **Start typing** in the left editor panel
2. **Preview updates** automatically in the right panel
3. **Click the filename** to rename your document
4. **Use the download button** to save your markdown file

### Keyboard Shortcuts

| Shortcut       | Action                       |
| -------------- | ---------------------------- |
| `Ctrl/Cmd + S` | Download markdown file       |
| `Ctrl/Cmd + /` | Focus editor                 |
| `Enter`        | Save filename (when editing) |
| `Escape`       | Cancel filename edit         |

### Mobile Usage

- **Tap the eye icon** to switch between editor and preview
- **Tap and hold code blocks** to copy on mobile
- **Use buttons** to navigate between views

## 🏗️ Architecture

### Project Structure

```
src/
├── components/          # React components
│   ├── Editor.jsx      # Markdown editor textarea
│   ├── Preview.jsx     # Markdown preview with custom renderers
│   └── Header.jsx      # Top navigation with filename and actions
├── store/              # Zustand state management
│   ├── useMarkdownStore.js  # Markdown content and preview state
│   ├── useFilenameStore.js  # File naming and editing state
│   └── useUIStore.js       # Theme and UI preferences
├── App.jsx             # Main application component
├── main.jsx           # React entry point
└── index.css          # Global styles and Tailwind imports
```

### State Management

The app uses [Zustand](https://github.com/pmndrs/zustand) for lightweight state management:

#### Markdown Store

```javascript
{
  markdown: "",           // Current markdown content
  preview: false,         // Mobile preview mode toggle
  setMarkdown: (content) => {},
  setPreview: (enabled) => {}
}
```

#### Filename Store

```javascript
{
  filename: "Untitled.md", // Current filename
  editing: false,          // Edit mode for filename
  tempName: "",           // Temporary name during editing
  // ... editing methods
}
```

#### UI Store

```javascript
{
  theme: "dark",          // Current theme (dark/light)
  setTheme: (theme) => {}
}
```

### Component Architecture

#### Editor Component

- Memoized for performance
- Controlled textarea with debounced updates
- Keyboard shortcuts integration
- Auto-focus and accessibility features

#### Preview Component

- Debounced markdown processing (300ms)
- Custom ReactMarkdown components
- Memoized renderers for performance
- Copy-to-clipboard functionality
- Loading states and error handling

#### Header Component

- Inline filename editing
- Download functionality
- Mobile view toggles
- Responsive navigation

## ⚡ Performance Features

### Optimization Strategies

1. **Debounced Rendering** - 300ms delay prevents excessive re-renders
2. **Memoized Components** - React.memo and useMemo prevent unnecessary updates
3. **Stable Keys** - Counter-based keys for code blocks ensure React optimization
4. **Timeout Management** - Proper cleanup prevents memory leaks
5. **Bundle Optimization** - Tree-shaking and minimal dependencies

### Bundle Size

- **Main bundle**: ~200KB (gzipped)
- **Dependencies**: Optimized with only necessary packages
- **Code splitting**: Automatic with Vite

## 🛠️ Development

### Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
npm run format     # Format code with Prettier
```

### Code Style

- **ESLint** - Configured with React and modern JS rules
- **Prettier** - Code formatting with Tailwind plugin
- **Conventional Commits** - Recommended for commit messages

### Adding Features

#### Custom Markdown Components

Add new renderers in `Preview.jsx`:

```javascript
const components = {
  // Add custom component
  customElement: ({ children, ...props }) => (
    <div className="custom-styling" {...props}>
      {children}
    </div>
  ),
  // ... existing components
};
```

#### New Keyboard Shortcuts

Add shortcuts in `App.jsx`:

```javascript
const handleKeyDown = (e) => {
  if (e.ctrlKey || e.metaKey) {
    switch (e.key) {
      case "n": // New shortcut
        e.preventDefault();
        // Your action here
        break;
    }
  }
};
```

## 🔧 Configuration

### Tailwind CSS

Custom theme configuration in `src/index.css`:

```css
@theme {
  --font-roboto: "Roboto", sans-serif;
}

@utility focus-ring {
  @apply focus:ring-2 focus:ring-sky-400 focus:outline-none;
}
```

### Vite Configuration

Build settings in `vite.config.js`:

```javascript
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Add custom config here
});
```

### Markdown Processing

ReactMarkdown plugins configuration:

```javascript
// Remark plugins (markdown parsing)
remarkPlugins={[
  remarkGfm,         // GitHub Flavored Markdown
  remarkMath,        // Math expressions
  remarkBreaks,      // Line breaks
  remarkExternalLinks, // External link handling
]}

// Rehype plugins (HTML processing)
rehypePlugins={[
  rehypeSlug,        // Heading IDs
  rehypeRaw,         // Raw HTML support
  rehypeHighlight,   // Syntax highlighting
  rehypeKatex,       // Math rendering
]}
```

## 🎨 Styling

### Theme System

- **CSS Custom Properties** - For dynamic theming
- **Tailwind Dark Mode** - Class-based dark mode
- **Responsive Design** - Mobile-first approach
- **Focus Management** - Keyboard navigation support

### Color Palette

```css
/* Light Mode */
--bg-primary: theme(colors.stone.50);
--text-primary: theme(colors.slate.800);
--border: theme(colors.slate.600);

/* Dark Mode */
--bg-primary: theme(colors.slate.900);
--text-primary: theme(colors.slate.200);
--border: theme(colors.slate.600);
```

## 📱 Mobile Support

### Responsive Features

- **Adaptive Layout** - Stacked layout on mobile
- **Touch Optimization** - Proper touch targets
- **Gesture Support** - Swipe navigation ready
- **Mobile Keyboard** - Optimized input handling

### Mobile-Specific UI

- Eye icon for preview toggle
- Full-screen preview mode
- Touch-friendly copy buttons
- Responsive typography

## 🤝 Contributing

### Getting Started

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run linting and formatting (`npm run lint && npm run format`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Guidelines

- Follow existing code style and patterns
- Add JSDoc comments for complex functions
- Test on multiple devices and browsers
- Ensure accessibility compliance
- Keep bundle size minimal

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Markdown** - Excellent markdown rendering
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **Vite** - Fast build tool and dev server
- **highlight.js** - Syntax highlighting
- **KaTeX** - Math expression rendering

---

Built with ❤️ using React and modern web technologies.
