import React, { Suspense, useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';
import socket from "../../socket";
import { Context } from "../../context/puzzle-context";


import {
  AppAside,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

const DefaultLayout = (props) => {

  const loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  const signOut = (e) => {
    e.preventDefault()
    props.history.push('/login')
  }

  const [pages, setPages] = useState([]);
  const [gateways, setGateways] = useState([]);
  const [fragments, setFragments] = useState([]);

  const onPages = data => {
    console.log("got pages", data);
    setPages(data);
  }

  const onGateways = data => {
    console.log("got gateways", data);
    setGateways(data);
  }

  const onFragments = data => {
    console.log("got fragments", data);
    setFragments(data);
  }

  useEffect(() => {
    socket.on("panel.pages", onPages);
    socket.on("panel.gateways", onGateways);
    socket.on("panel.fragments", onFragments);
    return () => socket.close();
  }, [])

  return (
    <div className="app">
      <AppHeader fixed>
        <Suspense fallback={loading()}>
          <DefaultHeader onLogout={e => signOut(e)} />
        </Suspense>
      </AppHeader>
      <div className="app-body">
        <AppSidebar fixed display="lg">
          <AppSidebarHeader />
          <AppSidebarForm />
          <Suspense>
            <AppSidebarNav navConfig={navigation} {...props} router={router} />
          </Suspense>
          <AppSidebarFooter />
          <AppSidebarMinimizer />
        </AppSidebar>
        <main className="main">
          <AppBreadcrumb appRoutes={routes} router={router} />
          <Context.Provider value={{ pages, gateways, fragments }}>
            <Container fluid>
              <Suspense fallback={loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/" to="/pages" />
                </Switch>
              </Suspense>
            </Container>
          </Context.Provider>
        </main>
        <AppAside fixed>
          <Suspense fallback={loading()}>
            <DefaultAside />
          </Suspense>
        </AppAside>
      </div>
    </div>
  );
}

export default DefaultLayout;
