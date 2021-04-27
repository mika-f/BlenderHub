import { configureStore } from "@reduxjs/toolkit";

import { reducer as configurationReducer } from "renderer/state/configuration";
import { reducer as installationsReducer } from "renderer/state/installations";
import { reducer as releasesReducer } from "renderer/state/releases";

const store = configureStore({
  reducer: {
    configuration: configurationReducer,
    installations: installationsReducer,
    releases: releasesReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export type { RootState, AppDispatch };

export { store };
