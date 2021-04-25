import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import Button from "renderer/components/button";
import Container from "renderer/components/container";
import Sidebar from "renderer/components/sidebar";
import { useAppDispatch, useAppSelector } from "renderer/hooks/redux";
import {
  addInstallation,
  executeInstallation,
  fetchInstallations,
  flushInstallations,
} from "renderer/state/installations";
import { Branch } from "shared/branch";
import { Installation } from "shared/messaging/installations";

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
  }, []);

  const onAddExists = () => {
    dispatch(addInstallation({ branch })).then(() => {
      dispatch(flushInstallations());
    });
  };

  const onExecuteBlender = (blender: Installation) => {
    dispatch(executeInstallation({ installation: blender }));
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
          installations.map((w) => (
            <div
              key={w.executable}
              className="h-14 px-4 border-b border-surface-light005 flex flex-row justify-center items-center"
            >
              <div className="flex-grow">Blender {w.version}</div>
              <Button onClick={() => onExecuteBlender(w)} primary>
                Launch
              </Button>
            </div>
          ))
        ) : (
          <div className="h-full flex justify-center items-center">No installation found</div>
        )}
      </div>
    </Container>
  );
};

export default Home;
