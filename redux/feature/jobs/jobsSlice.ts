import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Job {
    uuid: string;
    title: string;
    company_name: string;
    location: string;
    description: string;
  }
interface JobsState {
  selectedJob: Job | null; // To store a single selected job
  loading: boolean; // To track loading state
  error: string | null; // To store any error messages
}

const initialState: JobsState = {
  selectedJob: null,
  loading: false,
  error: null,
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setSelectedJob: (state, action: PayloadAction<Job | null>) => {
      state.selectedJob = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setSelectedJob, setLoading, setError } = jobsSlice.actions;

export default jobsSlice.reducer;
