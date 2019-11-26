import React, { useState, useEffect } from "react";
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Input
} from "reactstrap";
import socket from '../socket';
import { CodeEditor } from "./CodeEditor";
import { readCookie } from "@mehmetsefabalik/cookie-helper/dist";

const EditStorefrontConfigModal = ({ isOpen, toggle, data }) => {
  const [name, setName] = useState("");
  const [configurations, setConfigurations] = useState("");
  useEffect(() => {
    console.log("data", data)
    setName(data.storefront_name);
    const { storefront_name, ...config } = data;
    setConfigurations(JSON.stringify(config));
  }, [data]);
  const toggleModal = () => {
    toggle();
  }
  const saveStorefrontConfig = () => {
    let parsedConfigs;
    try {
      parsedConfigs = JSON.parse(configurations);
      socket.emit("panel.configurations.storefront.update", { name, configurations: { ...parsedConfigs, storefront_name: name }, auth: readCookie("auth") })
    } catch (e) {
      window.alert("invalid JSON");
    }
    toggleModal();
  }
  return <Modal size="lg" isOpen={isOpen} toggle={toggleModal} className={'modal-primary'}>
    <ModalHeader toggle={toggleModal}>Edit Storefront Configuration</ModalHeader>
    <ModalBody>
      <div className="inputs">
        <div className="text-input">
          <Input type="text" placeholder="Storefront Name" value={name} disabled></Input>
        </div>
      </div>
      <CodeEditor code={configurations} setCode={(code) => (console.log("code", code),setConfigurations(code))} />
    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={saveStorefrontConfig}>Edit</Button>{' '}
      <Button color="secondary" onClick={toggleModal}>Cancel</Button>
    </ModalFooter>
  </Modal>
}

export { EditStorefrontConfigModal }