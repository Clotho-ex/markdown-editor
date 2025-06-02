import { create } from "zustand";
import { persist } from "zustand/middleware";

const defaultFont = "Inter";

export const useUIStore = create(
  persist(
    (set) => ({
      theme: "dark",
      font: defaultFont,
      settingsOpen: false,
      setTheme: (theme) => set({ theme }),
      setFont: (font) => set({ font }),
      setSettingsOpen: (open) => set({ settingsOpen: open }),
      saveSettings: (theme, font) => set({ theme, font, settingsOpen: false }),
    }),
    { name: "ui-store" }
  )
);
