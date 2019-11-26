import React, { useEffect, useContext, useState } from 'react';
import {
  Col, Nav, NavItem, NavLink, TabContent, TabPane, Row, Button
} from "reactstrap";
import socket from '../../socket';
import { Context } from '../../context/puzzle-context';
import { readCookie } from '@mehmetsefabalik/cookie-helper/dist';
import { AddGatewayConfigModal } from '../../components/AddGatewayConfigModal';
import { EditGatewayConfigModal } from '../../components/EditGatewayConfigModal';

const GatewayConfigurations = () => {
  const { gatewayConfigurations } = useContext(Context);
  const [activeTab, setActiveTab] = useState('0');
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editModalData, setEditModalData] = useState({});
  useEffect(() => {
    socket.emit("panel.configurations.gateways.get")
  }, [])

  const toggle = (tabId) => {
    setActiveTab(tabId)
  }

  const nav = () => {
    return <Nav tabs>
      {gatewayConfigurations.map((config, i) => <NavItem key={i}>
        <NavLink
          active={activeTab === i.toString()}
          onClick={() => toggle(i.toString())}
        >
          {config.gateway_name}
        </NavLink>
      </NavItem>)}
    </Nav>
  }

  const onDeletePage = (name) => {
    const del = window.confirm("Do you want to delete gateway config?");
    if (del) {
      socket.emit("panel.configurations.gateway.delete", { name, auth: readCookie("auth") })
    }
  }

  const openEditModal = (data) => {
    setEditModalData(data);
    setEditModalOpen(true);
  }

  const tabPane = () => {
    return <TabContent activeTab={activeTab}>
      {gatewayConfigurations.map((config, i) => <TabPane key={i} tabId={i.toString()}>
        {activeTab === i.toString() &&
          <Row>
            <Col md="8">
              {JSON.stringify(config)}
              <hr />
            </Col>
            <Col md="4">
            </Col>
            <Button onClick={(() => openEditModal(config))}
              className="edit-button" color="primary">Edit</Button>
            <Button onClick={() => onDeletePage(config.gateway_name)}
              className="delete-button" color="danger">Delete</Button>
          </Row>
        }
      </TabPane>)
      }
    </TabContent>
  }

  return (
    <div className="animated fadeIn">
      {
        Array.isArray(gatewayConfigurations) &&
        <>
          <Col id="storefront-configuration-column" xs="12" md="12" className="mb-4">
            {nav()}
            {tabPane()}
            <Button onClick={(() => setAddModalOpen(true))} className="add-button" color="success">Add</Button>
          </Col>
          <AddGatewayConfigModal isOpen={addModalOpen} toggle={() => setAddModalOpen(false)} />
          <EditGatewayConfigModal isOpen={editModalOpen} toggle={() => setEditModalOpen(false)} data={editModalData} />
        </>
      }
    </div>
  );
}

export default GatewayConfigurations;

