import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import API from "../api/http-common";
const apiRoutePrefix = "job";

export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
  const response = await API.get(apiRoutePrefix);
  return response.data;
});

export const createJob = createAsyncThunk(
  "jobs/createJob",
  async ({ jobData, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.post(apiRoutePrefix, jobData);
      toast.success(response.data.message);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteJob = createAsyncThunk(
  "jobs/deleteJob",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await API.delete(apiRoutePrefix + "/" + id);
      toast.success(response.data.message);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateJob = createAsyncThunk(
  "jobs/updateJob",
  async ({ id, jobData, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.patch(`${apiRoutePrefix}/${id}`, jobData);
      toast.success(response.data.message);
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const JobSlice = createSlice({
  name: "jobs",
  initialState: {
    entities: [],
    error: "",
    loading: false,
  },
  reducers: {
    findJob(state, action) {
      const { id } = action.payload;
      return state.entities.find((job) => job.id === id);
    },
  },
  extraReducers: {
    [fetchJobs.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchJobs.fulfilled]: (state, action) => {
      state.loading = false;
      state.entities = action.payload.data;
    },
    [fetchJobs.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [createJob.pending]: (state, action) => {
      state.loading = true;
    },
    [createJob.fulfilled]: (state, action) => {
      state.loading = false;
      state.entities = [...state.entities, action.payload.data];
    },
    [createJob.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteJob.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteJob.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      state.entities = state.entities.filter((job) => job.id !== id);
    },
    [deleteJob.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateJob.pending]: (state, action) => {
      state.loading = true;
    },
    [updateJob.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [updateJob.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { findJob } = JobSlice.actions;

export default JobSlice.reducer;
