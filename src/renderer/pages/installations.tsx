import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import Container from "renderer/components/container";
import Sidebar from "renderer/components/sidebar";
import { useAppDispatch } from "renderer/hooks/redux";
import { fetchInstallations } from "renderer/state/installations";
import { Branch } from "shared/branch";

type Params = { branch: Branch };

type Props = {};

const SIDEBAR_ITEMS = [
  { title: "Installations (Stable)", path: "/installations/stable" },
  { title: "Installations (Daily)", path: "/installations/daily" },
  { title: "Installations (Experimental)", path: "/installations/experimental" },
];

const Home: React.VFC<Props> = () => {
  const { branch } = useParams<Params>();
  // const installations = useAppSelector((state) => state.installations[branch]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchInstallations());
  }, [branch]);

  return (
    <Container className="flex flex-row">
      <Sidebar items={SIDEBAR_ITEMS} />
    </Container>
  );
};

export default Home;
