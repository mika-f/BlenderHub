/* eslint-disable no-param-reassign */
import type { PayloadAction } from "@reduxjs/toolkit";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Branch } from "shared/branch";
import { Installation, Installations } from "shared/messaging/installations";

type InstallationsState = {
  [key in Branch]: Installations;
};

const initialState: InstallationsState = {
  stable: [],
  daily: [],
  experimental: [],
};

const fetchInstallations = createAsyncThunk("installations/fetchInstallations", () =>
  window.messaging.installations.fetchInstallations()
);

const slice = createSlice({
  name: "installations",
  initialState,
  reducers: {
    addInstallation: (state, action: PayloadAction<{ branch: Branch; installation: Installation }>) => {
      state[action.payload.branch] = [...state[action.payload.branch], action.payload.installation];
    },
    removeInstallation: (state, action: PayloadAction<{ branch: Branch; installation: Installation }>) => {
      const installations = state[action.payload.branch].filter(
        (w) => action.payload.installation.version !== w.version
      );
      state[action.payload.branch] = installations;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInstallations.fulfilled, (state, action) => {
      const installations = action.payload;

      for (let i = 0; i < installations.length; i += 1) {
        const installation = installations[i];

        switch (installation.branch) {
          case "stable":
            state.stable.push(installation);
            break;

          case "daily":
            state.daily.push(installation);
            break;

          case "experimental":
            state.experimental.push(installation);
            break;

          default:
            break;
        }
      }
    });
  },
});

export { initialState, slice };
export const { reducer } = slice;
export { fetchInstallations };
export const { addInstallation, removeInstallation } = slice.actions;
