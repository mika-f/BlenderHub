import { createGlobalState } from "react-hooks-global-state";

type State = {
  title: string;
  isShowPrevious: boolean;
};

const { useGlobalState } = createGlobalState<State>({
  title: "Blender Hub",
  isShowPrevious: false,
});

export { useGlobalState };
