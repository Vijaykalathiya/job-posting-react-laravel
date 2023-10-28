import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./services/jobSlice";

export default configureStore({
  reducer: {
    jobs: jobReducer,
  },
});