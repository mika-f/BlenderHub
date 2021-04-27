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
  },
});

export { initialState, slice };
export const { reducer } = slice;
export { readConfiguration, writeConfiguration };
// export const {} = slice.actions;
