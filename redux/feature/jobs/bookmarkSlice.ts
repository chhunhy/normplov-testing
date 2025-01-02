import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BookmarkState = {
  bookmarks: Record<string, boolean>; // Keyed by job UUID
};

const initialState: BookmarkState = {
  bookmarks: {}, // Initial empty state
};

const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    setBookmark: (state, action: PayloadAction<{ uuid: string; isBookmarked: boolean }>) => {
      state.bookmarks[action.payload.uuid] = action.payload.isBookmarked;
    },
    clearBookmark: (state, action: PayloadAction<string>) => {
      delete state.bookmarks[action.payload];
    },
    initializeBookmarks: (state, action: PayloadAction<Record<string, boolean>>) => {
      state.bookmarks = action.payload;
    },
  },
});

export const { setBookmark, clearBookmark, initializeBookmarks } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
