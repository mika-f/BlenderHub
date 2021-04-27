/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { IConfiguration } from "shared/messaging/configuration";

type ConfigurationState = {
  configuration: IConfiguration;
};

const initialState: ConfigurationState = {
  configuration: {
    libraryPath: "/",
  } as IConfiguration,
};

const readConfiguration = createAsyncThunk("configuration/read", async () => {
  const configuration = await window.messaging.configuration.readConfiguration();
  return configuration;
});

const selectDirectory = createAsyncThunk<string | null, void>("configuration/selectDirectory", async () => {
  const directory = await window.messaging.dialogs.showDirectorySelectDialog();
  return directory;
});

const writeConfiguration = createAsyncThunk<void, { configuration: IConfiguration }>(
  "configuration/write",
  async ({ configuration }) => {
    await window.messaging.configuration.writeConfiguration(configuration);
  }
);

const slice = createSlice({
  name: "configuration",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(readConfiguration.fulfilled, (state, action) => {
      state.configuration = action.payload;
    });

    builder.addCase(writeConfiguration.fulfilled, (state, action) => {
      state.configuration = action.meta.arg.configuration;
    });
  },
});

export { initialState, slice };
export const { reducer } = slice;
export { readConfiguration, selectDirectory, writeConfiguration };
// export const {} = slice.actions;
