import React, { useState, useEffect } from "react";
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Input
} from "reactstrap";
import socket from '../socket';
import { CodeEditor } from "./CodeEditor";

const EditPageModal = ({ isOpen, toggle, data }) => {
  console.log("data", data)
  const [html, setHtml] = useState(data.html);
  const [condition, setCondition] = useState(data.condition);
  const [name, setName] = useState(data.name);
  const [url, setUrl] = useState(data.url);
  const [demoUrl, setDemoUrl] = useState(data.demoUrl);
  const cleanState = () => {
    setHtml("");
    setCondition("");
    setName("");
    setUrl("");
    setDemoUrl("");
  }
  const toggleModal = () => {
    cleanState();
    toggle();
  }
  const savePage = () => {
    socket.emit("panel.pages.update", { html, condition, name, url, demoUrl })
    toggleModal();
  }
  useEffect(() => {
    setHtml(data.html);
    setCondition(data.condition);
    setName(data.name);
    setUrl(data.url);
  }, [data])
  return <Modal size="lg" isOpen={isOpen} toggle={toggleModal} className={'modal-primary'}>
    <ModalHeader toggle={toggleModal}>Edit Page</ModalHeader>
    <ModalBody>
      <div className="inputs">
        <div className="text-input">
          <Input type="text" placeholder="Name" value={name} disabled></Input>
        </div>
        <div className="text-input">
          <Input type="text" placeholder="Url" value={url} onChange={e => setUrl(e.target.value)}></Input>
        </div>
        <div className="text-input">
          <Input type="text" placeholder="Demo Url" value={demoUrl} onChange={e => setDemoUrl(e.target.value)}></Input>
        </div>
      </div>
      <div className="page-add-modal-label">Html: </div>
      <CodeEditor code={html} setCode={(code) => setHtml(code)} />
      <div className="page-add-modal-label">Condition: </div>
      <CodeEditor code={condition} setCode={(code) => setCondition(code)} />
    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={savePage}>Edit</Button>{' '}
      <Button color="secondary" onClick={toggleModal}>Cancel</Button>
    </ModalFooter>
  </Modal>
}

export { EditPageModal }
