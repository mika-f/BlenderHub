import React, { useEffect } from "react";

import Container from "../components/container";
import Sidebar from "../components/sidebar";

type Props = {};

const items = [
  { title: "Installations (Stable)", path: "/installations/stable" },
  { title: "Installations (Daily)", path: "/installations/daily" },
  { title: "Installations (Experimental)", path: "/installations/experimental" },
];

const Home: React.VFC<Props> = () => {
  useEffect(() => {}, []);

  return (
    <Container className="flex flex-row">
      <Sidebar items={items} />
    </Container>
  );
};

export default Home;
