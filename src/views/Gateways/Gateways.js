import React, { useEffect, useContext, useState } from 'react';
import {
  Col, Nav, NavItem, NavLink, TabContent, TabPane, Row, Button
} from "reactstrap";
import socket from '../../socket';
import { Context } from '../../context/puzzle-context';
import { AddGatewayModal } from "../../components/AddGatewayModal";
import { readCookie } from '@mehmetsefabalik/cookie-helper/dist';

const Gateways = () => {
  const { gateways } = useContext(Context);
  const [activeTab, setActiveTab] = useState('0');
  const [addGatewayModalOpen, setAddGatewayModalOpen] = useState(false);
  useEffect(() => {
    socket.emit("panel.gateways.get")
  }, [])

  const toggle = (tabId) => {
    setActiveTab(tabId)
  }

  const nav = () => {
    return <Nav tabs>
      {gateways.map((gw, i) => <NavItem key={i}>
        <NavLink
          active={activeTab === i.toString()}
          onClick={() => toggle(i.toString())}
        >
          {gw.name}
        </NavLink>
      </NavItem>)}
    </Nav>
  }

  const onDeletePage = (name) => {
    const del = window.confirm("Do you want to delete page?");
    if (del) {
      socket.emit("panel.gateways.delete", { name, auth: readCookie("auth") })
    }
  }

  const tabPane = () => {
    return <TabContent activeTab={activeTab}>
      {gateways.map((gw, i) => <TabPane key={i} tabId={i.toString()}>
        {activeTab === i.toString() &&
          <Row>
            <Col md="8">
              {gw.url}
              <hr />
              {gw.assetsUrl}
            </Col>
            <Col md="4">
            </Col>
            <Button onClick={() => onDeletePage(gw.name)}
              className="delete-button" color="danger">Delete Gateway</Button>
          </Row>
        }
      </TabPane>)
      }
    </TabContent>
  }

  return (
    <div className="animated fadeIn">
      {
        Array.isArray(gateways) &&
        <>
          <Col id="page-column" xs="12" md="12" className="mb-4">
            {nav()}
            {tabPane()}
            <Button onClick={(() => setAddGatewayModalOpen(true))} className="add-button" color="success">Add Gateway</Button>
          </Col>
          <AddGatewayModal isOpen={addGatewayModalOpen} toggle={() => setAddGatewayModalOpen(false)} />
        </>
      }
    </div>
  );
}

export default Gateways;

