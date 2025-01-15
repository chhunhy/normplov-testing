import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BookmarkState {
  bookmarks: Record<string, boolean>; // Dictionary of UUIDs to bookmark status
}

const initialState: BookmarkState = {
  bookmarks: {}, // Ensure it's an object
};

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    setBookmark: (
      state,
      action: PayloadAction<{ uuid: string; isBookmarked: boolean }>
    ) => {
      const { uuid, isBookmarked } = action.payload;

      // Ensure bookmarks object exists
      if (!state.bookmarks) {
        state.bookmarks = {};
      }

      // Update the bookmark status
      state.bookmarks[uuid] = isBookmarked;
    },
  },
});

export const { setBookmark } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
