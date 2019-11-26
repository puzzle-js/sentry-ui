import React, { useState, useEffect } from "react";
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Input
} from "reactstrap";
import socket from '../socket';
import { CodeEditor } from "./CodeEditor";
import { readCookie } from "@mehmetsefabalik/cookie-helper/dist";

const EditGatewayConfigModal = ({ isOpen, toggle, data }) => {
  const [name, setName] = useState("");
  const [configurations, setConfigurations] = useState("");
  useEffect(() => {
    console.log("data", data)
    setName(data.gateway_name);
    const { gateway_name, ...config } = data;
    setConfigurations(JSON.stringify(config));
  }, [data]);
  const toggleModal = () => {
    toggle();
  }
  const saveGatewayConfig = () => {
    let parsedConfigs;
    try {
      parsedConfigs = JSON.parse(configurations);
      socket.emit("panel.configurations.gateway.update", { name, configurations: { ...parsedConfigs, gateway_name: name }, auth: readCookie("auth") })
    } catch (e) {
      window.alert("invalid JSON");
    }
    toggleModal();
  }
  return <Modal size="lg" isOpen={isOpen} toggle={toggleModal} className={'modal-primary'}>
    <ModalHeader toggle={toggleModal}>Edit Gateway Configuration</ModalHeader>
    <ModalBody>
      <div className="inputs">
        <div className="text-input">
          <Input type="text" placeholder="Gateway Name" value={name} disabled></Input>
        </div>
      </div>
      <CodeEditor code={configurations} setCode={(code) => setConfigurations(code)} />
    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={saveGatewayConfig}>Edit</Button>{' '}
      <Button color="secondary" onClick={toggleModal}>Cancel</Button>
    </ModalFooter>
  </Modal>
}

export { EditGatewayConfigModal }