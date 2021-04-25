/* eslint-disable no-param-reassign */
import type { PayloadAction } from "@reduxjs/toolkit";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { Branch } from "shared/branch";
import type { OnCompletedCallback, OnProgressCallback, Release, Releases } from "shared/messaging/releases";

import { sortByVersionNumber } from "shared/utils";

type ReleasesState = {
  [key in Branch]: Releases;
};

const initialState: ReleasesState = {
  stable: [],
  daily: [],
  experimental: [],
};

const downloadRelease = createAsyncThunk<
  { branch: Branch; version: string },
  { branch: Branch; release: Release; onProgress: OnProgressCallback; onCompleted: OnCompletedCallback }
>("releases/downloadRelease", async ({ branch, release, onProgress, onCompleted }) => {
  await window.messaging.releases.downloadBlender({
    branch,
    version: release.version,
    url: release.url,
    onProgress,
    onCompleted,
  });

  return { branch, version: release.version };
});

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
  reducers: {
    updatePercentage: (state, action: PayloadAction<{ branch: Branch; release: Release; percentage: number }>) => {
      const { branch, release, percentage } = action.payload;

      if (state[branch].find((w) => w.version === release.version)) {
        state[branch].find((w) => w.version === release.version)!.state!.percentage = percentage * 100;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(downloadRelease.pending, (state, action) => {
      const { branch, release } = action.meta.arg;
      const downloading = state[branch].find((w) => w.version === release.version);
      if (downloading) {
        downloading.state = { isDownloading: true, percentage: 0 };
      }
    });

    builder.addCase(downloadRelease.fulfilled, (state, action) => {
      const { branch, version } = action.payload;

      if (state[branch].find((w) => w.version === version)) {
        state[branch].find((w) => w.version === version)!.state = { isDownloading: true, percentage: 0 };
      }
    });

    builder.addCase(fetchReleases.fulfilled, (state, action) => {
      const { branch, releases } = action.payload;

      for (let i = 0; i < releases.length; i += 1) {
        const release = releases[i];
        if (!state[branch].find((w) => w.version === release.version)) {
          state[branch].push(release);
        }
      }

      state[branch] = sortByVersionNumber(state[branch], (w) => w.version);
    });
  },
});

export { initialState, slice };
export const { reducer } = slice;
export { downloadRelease, fetchReleases };
export const { updatePercentage } = slice.actions;
