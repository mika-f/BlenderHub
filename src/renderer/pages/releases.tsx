import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import type { Branch } from "shared/branch";
import type { Release } from "shared/messaging/releases";

import Button from "renderer/components/button";
import Container from "renderer/components/container";
import Sidebar from "renderer/components/sidebar";
import { useAppDispatch, useAppSelector } from "renderer/hooks/redux";
import { fetchInstallations } from "renderer/state/installations";
import { fetchReleases } from "renderer/state/releases";

type Params = { branch: Branch };

type Props = {};

const SIDEBAR_ITEMS = [
  { title: "Releases (Stable)", path: "/releases/stable" },
  { title: "Releases (Daily)", path: "/releases/daily" },
  { title: "Releases (Experimental)", path: "/releases/experimental" },
];

const Releases: React.VFC<Props> = () => {
  const { branch } = useParams<Params>();
  const installations = useAppSelector((state) => state.installations[branch]);
  const releases = useAppSelector((state) => state.releases[branch]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchInstallations());
  }, []);

  useEffect(() => {
    dispatch(fetchReleases({ branch }));
  }, [branch]);

  const onInstall = (release: Release) => {};

  const isAlreadyInstalled = (release: Release) => !!installations.find((w) => w.version === release.version);

  return (
    <Container className="h-full flex flex-row flex-grow overflow-auto">
      <Sidebar items={SIDEBAR_ITEMS} />
      <div className="flex-grow flex flex-col">
        <div className="flex flex-row-reverse p-2">
          <div className="flex flex-col flex-grow justify-center text-2xl">
            <span className="capitalize">Releases ({branch})</span>
          </div>
        </div>
        {releases.length > 0 ? (
          <div className="flex-auto overflow-y-auto h-full">
            {releases.map((w) => (
              <div
                key={w.url}
                className="h-14 px-4 border-b border-surface-light005 flex flex-row justify-center items-center"
              >
                <div className="flex-grow">Blender {w.version}</div>
                <Button onClick={() => onInstall(w)} primary disabled={isAlreadyInstalled(w)}>
                  {isAlreadyInstalled(w) ? "Installed" : "Install"}
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex justify-center items-center">No releases found</div>
        )}
      </div>
    </Container>
  );
};

export default Releases;
