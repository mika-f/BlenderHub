import { createGlobalState } from "react-hooks-global-state";

import type { Installations } from "renderer/messaging/fetcher";

type State = {
  installations: {
    stable: { versions: Installations };
    daily: { versions: Installations };
    experimental: { versions: Installations };
  };
  libraryPath?: string;
};

const { useGlobalState } = createGlobalState<State>({
  installations: {
    stable: { versions: [] },
    daily: { versions: [] },
    experimental: { versions: [] },
  },
  libraryPath: undefined,
});

export { useGlobalState };
