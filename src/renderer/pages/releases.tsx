import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import type { Branch } from "shared/branch";
import type { Release } from "shared/messaging/releases";

import Button from "renderer/components/button";
import Container from "renderer/components/container";
import Sidebar from "renderer/components/sidebar";
import { useAppDispatch, useAppSelector } from "renderer/hooks/redux";
import { addInstallationFromRelease, fetchInstallations } from "renderer/state/installations";
import { updatePercentage, downloadRelease, extractDownloadedRelease, fetchReleases } from "renderer/state/releases";

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

  const onInstall = (release: Release) => {
    const onProgress = (progress: number) => {
      dispatch(updatePercentage({ branch, release, percentage: progress }));
    };
    const onCompleted = (path: string) => {
      dispatch(extractDownloadedRelease({ path, branch, version: release.version })).then((w) => {
        console.log(w.payload);
        // @ts-ignore
        dispatch(addInstallationFromRelease({ path: w.payload.path, release }));
      });
    };

    dispatch(downloadRelease({ branch, release, onProgress, onCompleted }));
  };

  const isAlreadyInstalled = (release: Release) => !!installations.find((w) => w.version === release.version);

  const isDownloading = (release: Release) => release.state && release.state.operation === "download";

  const getLabel = (release: Release) => {
    if (isAlreadyInstalled(release)) {
      return "Installed";
    }

    return isDownloading(release) ? "Downloading" : "Install";
  };

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
                {isDownloading(w) ? (
                  <div className="m-2 h-2 w-24 bg-surface-light005">
                    <div className="min-w-0 max-w-24 bg-blue-500 h-2" style={{ width: `${w.state?.percentage}%` }} />
                  </div>
                ) : null}
                <Button onClick={() => onInstall(w)} primary disabled={isAlreadyInstalled(w) || isDownloading(w)}>
                  {getLabel(w)}
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
