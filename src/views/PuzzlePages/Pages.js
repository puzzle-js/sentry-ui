import React, { useEffect, useContext, useState } from 'react';
import socket from '../../socket';
import { Context } from '../../context/puzzle-context';
import {
  Col, Nav, NavItem, NavLink, TabContent, TabPane, Row, Button
} from "reactstrap";
import { AddPageModal } from '../../components/AddPageModal';
import { EditPageModal } from '../../components/EditPageModal';
import { CodeEditor } from '../../components/CodeEditor';

const Pages = () => {
  const { pages } = useContext(Context);
  const [activeTab, setActiveTab] = useState('0');
  const [addPageModalOpen, setAddPageModalOpen] = useState(false);
  const [editPageModalOpen, setEditPageModalOpen] = useState(false);
  const [editModalData, setEditModalData] = useState({});
  useEffect(() => {
    socket.emit("panel.pages.get")
  }, [])

  const toggle = (tabId) => {
    setActiveTab(tabId)
  }

  const addPageModalToggle = (e) => {
    setAddPageModalOpen(false)
  }

  const editPageModalToggle = (e) => {
    setEditPageModalOpen(false)
  }

  const openEditPageModal = (html, name, url, condition) => {
    setEditModalData({ html, name, url, condition });
    setEditPageModalOpen(true);
  }

  const nav = () => {
    return <Nav tabs>
      {pages.map((page, i) => <NavItem key={i}>
        <NavLink
          active={activeTab === i.toString()}
          onClick={() => toggle(i.toString())}
        >
          {page.name}
        </NavLink>
      </NavItem>)}
    </Nav>
  }

  const tabPane = () => {
    return <TabContent activeTab={activeTab}>
      {pages.map((page, i) => <TabPane key={i} tabId={i.toString()}>
        {activeTab === i.toString() &&
          <Row>
            <Col md="8">
              {page.url}
              <hr />
              <CodeEditor code={page.html} setCode={_ => null} />
              {page.condition && <CodeEditor code={page.condition} setCode={_ => null} />}
            </Col>
            <Col md="4">
            </Col>
            <Button onClick={(() => openEditPageModal(page.html, page.name, page.url, page.condition))} className="edit-button" color="success">Edit Page</Button>
          </Row>
        }
      </TabPane>)
      }
    </TabContent>
  }

  return (
    <div className="animated fadeIn">
      {
        Array.isArray(pages) &&
        <>
          <Col id="page-column" xs="12" md="12" className="mb-4">
            {nav()}
            {tabPane()}
            <div className="add-button-wrapper">
              <Button onClick={(() => setAddPageModalOpen(true))} className="add-button" color="primary">Add Page</Button>
            </div>
          </Col>
          <AddPageModal isOpen={addPageModalOpen} toggle={addPageModalToggle} />
          <EditPageModal isOpen={editPageModalOpen} toggle={editPageModalToggle} data={editModalData} />
        </>
      }
    </div>
  );
}

export default Pages;