import React, { useEffect } from "react";

import Container from "../components/container";

import { useGlobalState } from "../state/global";

type Props = {};

const Settings: React.VFC<Props> = () => {
  const [, setTitle] = useGlobalState("title");

  useEffect(() => {
    setTitle("Settings");
  }, []);

  return <Container>Settings</Container>;
};

export default Settings;
