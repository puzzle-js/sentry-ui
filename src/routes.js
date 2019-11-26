import React from 'react';
import StorefrontConfigurations from './views/StorefrontConfigurations/StorefrontConfigurations';
import GatewayConfigurations from './views/GatewayConfigurations/GatewayConfigurations';

const Gateways = React.lazy(() => import('./views/Gateways'));
const PuzzlePages = React.lazy(() => import('./views/PuzzlePages'));
const Fragments = React.lazy(() => import('./views/Fragments/Fragments'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/gateways', name: 'Gateways', component: Gateways },
  { path: '/pages', name: 'Pages', component: PuzzlePages },
  { path: '/fragments', name: 'Fragments', component: Fragments },
  { path: '/storefront-configurations', name: 'Storefront Configurations', component: StorefrontConfigurations },
  { path: '/gateway-configurations', name: 'Gateway Configurations', component: GatewayConfigurations },
];

export default routes;
