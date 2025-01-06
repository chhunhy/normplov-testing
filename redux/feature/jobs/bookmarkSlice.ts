import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BookmarkState = {
  bookmarks: Record<string, boolean>;
};

const initialState: BookmarkState = {
  bookmarks: {},
};

const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    initializeBookmarks: (
      state,
      action: PayloadAction<Record<string, boolean>>
    ) => {
      state.bookmarks = action.payload; // Initialize with fetched bookmarks
    },
    setBookmark: (
      state,
      action: PayloadAction<{ uuid: string; isBookmarked: boolean }>
    ) => {
      state.bookmarks[action.payload.uuid] = action.payload.isBookmarked; // Toggle bookmark
    },
  },
});

export const { initializeBookmarks, setBookmark } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
