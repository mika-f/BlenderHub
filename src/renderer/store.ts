import { configureStore } from "@reduxjs/toolkit";

import { reducer as installationsReducer } from "renderer/state/installations";

const store = configureStore({
  reducer: {
    installations: installationsReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export type { RootState, AppDispatch };

export { store };
