import { BrowserRouter, useRoutes } from 'react-router-dom';
import { useStoreWithInitializer } from '../../state/storeHooks';
import { load } from './services/load';
import { buildRoutes } from './services/buildRoutes';
import { Fragment } from 'react';

export function App() {
  return (
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  );
}

export function Routing() {
  const state = useStoreWithInitializer((state) => state, load);
  const routes = buildRoutes(state);
  const element = useRoutes(routes);
  return <Fragment>{element}</Fragment>;
}
