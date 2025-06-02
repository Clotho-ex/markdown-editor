import { create } from "zustand";

const DEFAULT_FILENAME = "Untitled.md";

export const useFilenameStore = create((set, get) => ({
  filename: DEFAULT_FILENAME,
  editing: false,
  tempName: DEFAULT_FILENAME,
  justEdited: false,

  setFilename: (name) => set({ filename: name }),
  setEditing: (editing) => set({ editing }),
  setTempName: (tempName) => set({ tempName }),
  setJustEdited: (justEdited) => set({ justEdited }),

  // Call to start editing (sets tempName to current filename)
  startEditing: () =>
    set({ editing: true, tempName: get().filename || DEFAULT_FILENAME }),

  // Call to save the filename and exit editing
  saveFilename: () => {
    const prev = get().filename;
    let value = get()
      .tempName.trim()
      .replace(/[\\/:*?"<>|]/g, "")
      .replace(/\s+/g, ""); // Remove all spaces

    if (!value) value = DEFAULT_FILENAME;
    if (!value.endsWith(".md")) value += ".md";
    
    const changed = value !== prev;
    set({ filename: value, editing: false, justEdited: changed });
  },

  // Call to cancel editing (revert tempName, exit editing)
  cancelEditing: () =>
    set({ editing: false, tempName: get().filename || DEFAULT_FILENAME }),
}));
