import React, {Component} from 'react';
import {Button, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import CodeEditor from "../../components/CodeEditor";


class Gateways extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill('1'),
    };
  }

  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({
      activeTab: newArray,
    });
  }

  gatewayContent() {
    return (
      <>
        <Row>
          <Col>
            Instances: 7
          </Col>
        </Row>
        <Row>
          <CodeEditor/>
        </Row>
        <hr/>
        <Row>
          <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
            <Button color="danger">Delete</Button>
          </Col>
        </Row>
      </>
    )
  }

  tabPane() {
    return (
      <>
        <TabPane tabId="1">
          {this.gatewayContent()}
        </TabPane>
        <TabPane tabId="2">
          {this.gatewayContent()}
        </TabPane>
        <TabPane tabId="3">
          {this.gatewayContent()}
        </TabPane>
        <TabPane tabId="4">
          {this.gatewayContent()}
        </TabPane>
      </>
    );
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12" className="mb-4">
            <Nav tabs>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '1'}
                  onClick={() => {
                    this.toggle(0, '1');
                  }}
                >
                  Browsing
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '2'}
                  onClick={() => {
                    this.toggle(0, '2');
                  }}
                >
                  Search
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '3'}
                  onClick={() => {
                    this.toggle(0, '3');
                  }}
                >
                  Checkout
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '4'}
                  onClick={() => {
                    this.toggle(0, '4');
                  }}
                >
                  Account
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab[0]}>
              {this.tabPane()}
            </TabContent>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Gateways;
