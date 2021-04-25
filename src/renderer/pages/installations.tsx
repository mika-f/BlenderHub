import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import Button from "renderer/components/button";
import Container from "renderer/components/container";
import Sidebar from "renderer/components/sidebar";
import { useAppDispatch, useAppSelector } from "renderer/hooks/redux";
import { addInstallation, fetchInstallations, flushInstallations } from "renderer/state/installations";
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
  const installations = useAppSelector((state) => state.installations[branch]);
  // const releases = useAppSelector((state) => state.releases[branch]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchInstallations());
  }, [branch]);

  const onAddExists = () => {
    dispatch(addInstallation({ branch })).then(() => {
      dispatch(flushInstallations());
    });
  };

  return (
    <Container className="h-full flex flex-row flex-grow">
      <Sidebar items={SIDEBAR_ITEMS} />
      <div className="flex-grow flex flex-col">
        <div className="flex flex-row-reverse p-2">
          <div className="m-2">
            <Button onClick={() => {}} primary>
              New Install
            </Button>
          </div>
          <div className="m-2">
            <Button onClick={onAddExists}>Add Exists</Button>
          </div>
          <div className="flex flex-col flex-grow justify-center text-2xl">
            <span className="capitalize">Installations ({branch})</span>
          </div>
        </div>
        {installations.length > 0 ? (
          installations.map((w) => {
            <div>{w.version}</div>;
          })
        ) : (
          <div className="h-full flex justify-center items-center">No installation found</div>
        )}
      </div>
    </Container>
  );
};

export default Home;
