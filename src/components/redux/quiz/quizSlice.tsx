// src/features/feed/feedSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchFeed } from '../../api/api';
import { feedGratitude } from '../../utils/Types';


interface FeedState {
  feedData: ApiResponse | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  loading: boolean
}
export interface ApiResponse {
  data: feedGratitude[];
}

const initialState: FeedState = {
  feedData: null,
  status: 'idle',
  error: null,
  loading: false,
};





export const fetchFeedDataAsync = createAsyncThunk(
  '/feed',
  async () => {
    try {
      const response = await fetchFeed();
      console.log('Fetched data:', response); // Log the response
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    updateFeedData: (state: FeedState, action: PayloadAction<ApiResponse>) => {
      state.feedData = action.payload;
    },
    fetchFeedDataStart(state) {
      state.loading = true; // Set loading to true when fetching data starts
    },
    fetchFeedDataSuccess(state, action) {
      state.loading = false; // Set loading to false when fetching data is successful
      state.feedData = action.payload;
    },
    fetchFeedDataFailure(state) {
      state.loading = false; // Set loading to false when fetching data fails
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedDataAsync.pending, (state: FeedState) => {
        state.status = 'loading';
      })
      .addCase(fetchFeedDataAsync.fulfilled, (state: FeedState, action: PayloadAction<ApiResponse>) => {
        state.status = 'succeeded';
        state.feedData = action.payload;
      })
      .addCase(fetchFeedDataAsync.rejected, (state: FeedState, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload?.message;
      });
  },
});


export const selectFeedData = (state: { feed: FeedState }) => state.feed.feedData;

export const selectFeedStatus = (state: { feed: FeedState }) => state.feed.status;
export const selectFeedError = (state: { feed: FeedState }) => state.feed.error;

export const { updateFeedData } = feedSlice.actions;
export const { fetchFeedDataStart, fetchFeedDataSuccess, fetchFeedDataFailure } = feedSlice.actions;
export const selectLoading = (state) => state.quiz.loading;

export default feedSlice.reducer;