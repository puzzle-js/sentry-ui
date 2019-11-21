import React, { useState } from "react";
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Input
} from "reactstrap";
import socket from '../socket';
import { readCookie } from "@mehmetsefabalik/cookie-helper/dist";

const AddGatewayModal = ({ isOpen, toggle }) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [assetUrl, setAssetUrl] = useState("");
  const cleanState = () => {
    setName("");
    setUrl("");
    setAssetUrl("");
  }
  const toggleModal = () => {
    cleanState();
    toggle();
  }
  const saveGateway = () => {
    socket.emit("panel.gateways.add", { name, url, assetUrl, auth: readCookie("auth") })
    toggleModal();
  }
  return <Modal size="lg" isOpen={isOpen} toggle={toggleModal} className={'modal-primary'}>
    <ModalHeader toggle={toggleModal}>Add Gateway</ModalHeader>
    <ModalBody>
      <div className="inputs">
        <div className="text-input">
          <Input type="text" placeholder="name" onChange={e => setName(e.target.value)}></Input>
        </div>
        <div className="text-input">
          <Input type="text" placeholder="url" onChange={e => setUrl(e.target.value)}></Input>
        </div><div className="text-input">
          <Input type="text" placeholder="assetUrl" onChange={e => setAssetUrl(e.target.value)}></Input>
        </div>
      </div>
    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={saveGateway}>Add</Button>{' '}
      <Button color="secondary" onClick={toggleModal}>Cancel</Button>
    </ModalFooter>
  </Modal>
}

export { AddGatewayModal }