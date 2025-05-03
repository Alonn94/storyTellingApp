import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface Story {
  id: number;
  title: string;
  content: string;
  author_id: number;
  created_at: string;
  updated_at: string;
}

interface StoryState {
  stories: Story[];
  loading: boolean;
  error: string | null;
}

const initialState: StoryState = {
  stories: [],
  loading: false,
  error: null,
};

export const fetchStories = createAsyncThunk<Story[]>(
  "stories/fetchStories",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("https://collab-story-backend.onrender.com/api/stories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", 
      });

      if (!res.ok) {
        const data = await res.json();
        return thunkAPI.rejectWithValue(data.message || "Failed to fetch stories");
      }

      const data = await res.json();
      return data.stories;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const storySlice = createSlice({
  name: "story",
  initialState,
  reducers: {
    setStories: (state, action: PayloadAction<Story[]>) => {
      state.stories = action.payload;
    },
    addStory: (state, action: PayloadAction<Story>) => {
      state.stories.push(action.payload);
    },
    updateStory: (state, action: PayloadAction<Story>) => {
      const index = state.stories.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) {
        state.stories[index] = action.payload;
      }
    },
    deleteStory: (state, action: PayloadAction<number>) => {
      state.stories = state.stories.filter((s) => s.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.loading = false;
        state.stories = action.payload;
      })
      .addCase(fetchStories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setStories, addStory, updateStory, deleteStory } = storySlice.actions;
export default storySlice.reducer;