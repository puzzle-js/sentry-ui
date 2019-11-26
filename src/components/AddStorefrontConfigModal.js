import React, { useState } from "react";
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Input
} from "reactstrap";
import socket from '../socket';
import { CodeEditor } from "./CodeEditor";
import { readCookie } from "@mehmetsefabalik/cookie-helper/dist";

const AddStorefrontConfigModal = ({ isOpen, toggle }) => {
  const [name, setName] = useState("");
  const [configurations, setConfigurations] = useState("");
  const cleanState = () => {
    setName("");
    setConfigurations("");
  }
  const toggleModal = () => {
    cleanState();
    toggle();
  }
  const saveStorefrontConfig = () => {
    let parsedConfigs;
    try {
      parsedConfigs = JSON.parse(configurations);
      socket.emit("panel.configurations.storefront.add", { name, configurations: { ...parsedConfigs, storefront_name: name }, auth: readCookie("auth") })
    } catch (e) {
      window.alert("invalid JSON");
    }
    toggleModal();
  }
  return <Modal size="lg" isOpen={isOpen} toggle={toggleModal} className={'modal-primary'}>
    <ModalHeader toggle={toggleModal}>Add Storefront Configuration</ModalHeader>
    <ModalBody>
      <div className="inputs">
        <div className="text-input">
          <Input type="text" placeholder="Storefront Name" onChange={e => setName(e.target.value)}></Input>
        </div>
      </div>
      <CodeEditor code={configurations} setCode={(code) => setConfigurations(code)} />
    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={saveStorefrontConfig}>Add</Button>{' '}
      <Button color="secondary" onClick={toggleModal}>Cancel</Button>
    </ModalFooter>
  </Modal>
}

export { AddStorefrontConfigModal }