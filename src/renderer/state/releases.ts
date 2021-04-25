/* eslint-disable no-param-reassign */
// import type { PayloadAction } from "@reduxjs/toolkit";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Branch } from "shared/branch";
import { Releases } from "shared/messaging/releases";

type ReleasesState = {
  [key in Branch]: Releases;
};

const initialState: ReleasesState = {
  stable: [],
  daily: [],
  experimental: [],
};

const fetchReleases = createAsyncThunk<{ branch: Branch; releases: Releases }, { branch: Branch }>(
  "releases/fetchReleases",
  async ({ branch }) => {
    switch (branch) {
      case "stable":
        return { branch, releases: await window.messaging.releases.fetchBlenderStableReleases() };

      case "daily":
        return { branch, releases: await window.messaging.releases.fetchBlenderDailyReleases() };

      case "experimental":
        return { branch, releases: await window.messaging.releases.fetchBlenderExperimentalReleases() };

      default:
        return { branch, releases: [] };
    }
  }
);

const slice = createSlice({
  name: "releases",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchReleases.fulfilled, (state, action) => {
      const { branch, releases } = action.payload;

      state[branch] = releases;
    });
  },
});

export { initialState, slice };
export const { reducer } = slice;
export { fetchReleases };
// export const {} = slice.actions;
