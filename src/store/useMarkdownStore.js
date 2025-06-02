import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useMarkdownStore = create(
  persist(
    (set) => ({
      markdown: "",
      preview: false,
      setMarkdown: (markdown) => set({ markdown }),
      setPreview: (preview) => set({ preview }),
    }),
    { name: "markdown-store" }
  )
);
