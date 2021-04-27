import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import Button from "renderer/components/button";
import Card from "renderer/components/card";
import Container from "renderer/components/container";
import Input from "renderer/components/input";
import Sidebar from "renderer/components/sidebar";
import { useAppDispatch, useAppSelector } from "renderer/hooks/redux";
import { readConfiguration } from "renderer/state/configuration";

type Params = { category: "general" };

type Props = {};

const SIDEBAR_ITEMS = [
  { title: "General", path: "/settings/general" },
  //
];

const Settings: React.VFC<Props> = () => {
  const { category } = useParams<Params>();
  const configuration = useAppSelector((w) => w.configuration.configuration);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(readConfiguration());
  }, []);

  return (
    <Container className="h-full flex flex-row flex-grow overflow-auto">
      <Sidebar items={SIDEBAR_ITEMS} />
      <div className="flex-grow flex flex-col">
        <div className="flex flex-row-reverse p-2">
          <div className="flex flex-col flex-grow justify-center text-2xl">
            <span className="capitalize select-none">{category}</span>
          </div>
        </div>
        <div className="flex-auto overflow-y-auto h-full px-2">
          <Card title="Installation Path">
            <p className="select-none">
              Choose where Blender are installed on your computer. The location of existing Blender installations will
              not be changed.
            </p>
            <div className="my-2">
              <div>
                <small className="select-none">Installation Path</small>
              </div>
              <div className="flex w-full">
                <Input className="flex-auto mr-2" value={configuration.libraryPath} readonly />
                <Button primary>
                  <div className="select-none">Choose a Folder</div>
                </Button>
              </div>
            </div>
          </Card>
          <Card title="Language">
            <p className="select-none">Choose a display language.</p>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default Settings;
