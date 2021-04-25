/* eslint-disable no-param-reassign */
import type { PayloadAction } from "@reduxjs/toolkit";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { AppDispatch, RootState } from "renderer/store";
import type { Branch } from "shared/branch";
import type { FilePath } from "shared/messaging/dialogs";
import type { Installation, Installations } from "shared/messaging/installations";
import type { Release } from "shared/messaging/releases";
import { sortByVersionNumber } from "shared/utils";

type InstallationsState = {
  [key in Branch]: Installations;
};

const initialState: InstallationsState = {
  stable: [],
  daily: [],
  experimental: [],
};

const addInstallation = createAsyncThunk<{ branch: Branch; executable: FilePath | null }, { branch: Branch }>(
  "installations/addInstallation",
  async ({ branch }) => {
    const executable = await window.messaging.dialogs.showBlenderSelectDialog();
    return { branch, executable };
  }
);

const executeInstallation = createAsyncThunk<void, { installation: Installation }>(
  "installations/executeInstallation",
  async ({ installation }) => {
    await window.messaging.installations.executeInstallation({ installation });
  }
);

const fetchInstallations = createAsyncThunk("installations/fetchInstallations", () =>
  window.messaging.installations.fetchInstallations()
);

const flushInstallations = createAsyncThunk<void, void, { dispatch: AppDispatch; state: RootState }>(
  "installations/flushInstallations",
  async (_, { getState }) => {
    const state = getState().installations;
    const installations: Installations = [];

    installations.push(...state.stable);
    installations.push(...state.daily);
    installations.push(...state.experimental);

    window.messaging.installations.flushInstallations({ installations });
  }
);

const slice = createSlice({
  name: "installations",
  initialState,
  reducers: {
    addInstallationFromRelease: (state, action: PayloadAction<{ path: string; release: Release }>) => {
      const { path, release } = action.payload;

      state[release.branch].push({ branch: release.branch, executable: path, version: release.version });
      state[release.branch] = sortByVersionNumber(state[release.branch], (w) => w.version);
    },
    removeInstallation: (state, action: PayloadAction<{ branch: Branch; installation: Installation }>) => {
      const installations = state[action.payload.branch].filter(
        (w) => action.payload.installation.version !== w.version
      );
      state[action.payload.branch] = sortByVersionNumber(installations, (w) => w.version);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addInstallation.fulfilled, (state, action) => {
      if (action.payload.executable === null) {
        return;
      }

      const installation = { branch: action.payload.branch, ...action.payload.executable } as Installation;
      state[action.payload.branch].push(installation);
      state[action.payload.branch] = sortByVersionNumber(state[action.payload.branch], (w) => w.version);
    });

    builder.addCase(fetchInstallations.fulfilled, (state, action) => {
      const installations = sortByVersionNumber(action.payload, (w) => w.version);

      for (let i = 0; i < installations.length; i += 1) {
        const installation = installations[i];

        switch (installation.branch) {
          case "stable":
            if (!state.stable.find((w) => w.executable === installation.executable)) {
              state.stable.push(installation);
            }

            break;

          case "daily":
            if (!state.daily.find((w) => w.executable === installation.executable)) {
              state.daily.push(installation);
            }
            break;

          case "experimental":
            if (!state.experimental.find((w) => w.executable === installation.executable)) {
              state.experimental.push(installation);
            }
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
export { addInstallation, executeInstallation, fetchInstallations, flushInstallations };
export const { addInstallationFromRelease, removeInstallation } = slice.actions;
