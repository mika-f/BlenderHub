import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import Container from "renderer/components/container";
import Sidebar from "renderer/components/sidebar";
import { fetchBlenderReleasesWithInstallations } from "renderer/messaging/fetcher";
import { useGlobalState } from "renderer/state/global";
import { Branch } from "shared/branch";

type Params = { branch: Branch };

type Props = {};

const SIDEBAR_ITEMS = [
  { title: "Installations (Stable)", path: "/installations/stable" },
  { title: "Installations (Daily)", path: "/installations/daily" },
  { title: "Installations (Experimental)", path: "/installations/experimental" },
];

const Home: React.VFC<Props> = () => {
  const [installations, setInstallations] = useGlobalState("installations");
  const { branch } = useParams<Params>();

  useEffect(() => {
    if (installations[branch].versions.length === 0) {
      fetchBlenderReleasesWithInstallations(branch).then((items) => {
        installations[branch].versions = items;
        setInstallations(installations);
      });
    }
  }, [branch]);

  return (
    <Container className="flex flex-row">
      <Sidebar items={SIDEBAR_ITEMS} />
    </Container>
  );
};

export default Home;
