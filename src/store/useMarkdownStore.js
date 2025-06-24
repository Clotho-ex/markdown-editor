import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useMarkdownStore = create(
  persist(
    (set) => ({
      markdown: `# 🚀 Secure Markdown Editor Demo

Welcome to the **Secure Markdown Editor**!  
Here’s a quick showcase of its features:

---

## ✨ Features

- **Live Preview**
- GitHub-Flavored Markdown (GFM)
- Math support: $E = mc^2$
- Syntax Highlighting for Code
- Tables, Task Lists, and More!

---

## 📦 Code Example

\`\`\`js
function greet(name) {
  return \`Hello, \${name}! 👋\`;
}
console.log(greet("Markdown"));
\`\`\`

---

## 📊 Table Example

| Feature         | Supported? |
|-----------------|:----------:|
| **Bold**        | ✅         |
| *Italic*        | ✅         |
| \`Code\`          | ✅         |
| [Links](#)      | ✅         |
| Images          | ✅         |

---

## [ ] Task List Example

- [x] Live Preview
- [x] Dark Mode
- [ ] Collaboration (coming soon!)

---

## 🧮 Math Example

Inline: $a^2 + b^2 = c^2$

Block:

$$
\\\\int_{-\\\\infty}^{\\\\infty} e^{-x^2} dx = \\\\sqrt{\\\\pi}
$$

---

> “Markdown is not a replacement for HTML, but a tool for writing content for the web.”  
> — John Gruber

---

![Markdown Logo](https://markdown-here.com/img/icon256.png)`,
      preview: false,
      setMarkdown: (markdown) => set({ markdown }),
      setPreview: (preview) => set({ preview }),
    }),
    { name: "markdown-store" },
  ),
);
