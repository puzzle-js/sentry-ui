import React, {useEffect, useContext, useState} from 'react';
import socket from '../../socket';
import {Context} from '../../context/puzzle-context';
import {
  Col, Nav, NavItem, NavLink, TabContent, TabPane, Row, Button
} from "reactstrap";
import {AddPageModal} from '../../components/AddPageModal';
import {EditPageModal} from '../../components/EditPageModal';
import {CodeEditor} from '../../components/CodeEditor';

const Pages = () => {
  const {pages} = useContext(Context);
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

  const openEditPageModal = (page) => {
    setEditModalData(page);
    setEditPageModalOpen(true);
  }

  const onDeletePage = (name) => {
    const del = window.confirm("Do you want to delete page?");
    if (del) {
      socket.emit("panel.pages.delete", {name})
    }
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
      <NavItem>
        <NavLink>
          <Button onClick={(() => setAddPageModalOpen(true))} className="add-button" color="success">Add
                Page</Button>
        </NavLink>
      </NavItem>
    </Nav>
  }

  const tabPane = () => {
    return <TabContent activeTab={activeTab}>
      {pages.map((page, i) => <TabPane key={i} tabId={i.toString()}>
        {activeTab === i.toString() &&
        <Row>
          <Col md="8">
            {page.url}
            <hr/>
            <CodeEditor code={page.html} setCode={_ => null} disabled/>
            {page.condition && <CodeEditor code={page.condition} setCode={_ => null}/>}
          </Col>
          <Col md="4">
            {page.demoUrl &&
            <iframe src={page.demoUrl} title="demo"
                    style={{height: '100%', width: '100%', border: 'none', minHeight: '600px'}}/>
            }
          </Col>
          <Button onClick={(() => openEditPageModal(page))}
            className="edit-button" color="primary">Edit Page</Button>
          <Button onClick={() => onDeletePage(page.name)}
                  className="edit-button" color="danger">Delete Page</Button>
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
          </Col>
          <AddPageModal isOpen={addPageModalOpen} toggle={addPageModalToggle}/>
          <EditPageModal isOpen={editPageModalOpen} toggle={editPageModalToggle} data={editModalData}/>
        </>
      }
    </div>
  );
}

export default Pages;
