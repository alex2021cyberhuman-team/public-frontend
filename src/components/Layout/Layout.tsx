import { useStore, useStoreWithInitializer } from '../../state/storeHooks';
import { Outlet, RouteObject, useRoutes } from 'react-router-dom';
import { Home } from '../Pages/Home/Home';
import { ProfilePage } from '../Pages/ProfilePage/ProfilePage';
import { ArticlePage } from '../Pages/ArticlePage/ArticlePage';
import { Settings } from '../Pages/Settings/Settings';
import { NewArticle } from '../Pages/NewArticle/NewArticle';
import { EditArticle } from '../Pages/EditArticle/EditArticle';
import { Login } from '../Pages/Login/Login';
import { Register } from '../Pages/Register/Register';
import { Redirect } from '../Redirect/Redirect';
import React, { Fragment } from 'react';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { getAccessTokenExpire } from '../../types/user';
import { store } from '../../state/store';
import { endLoad, loadUser } from '../App/App.slice';
import axios from 'axios';
import { getUser } from '../../services/webapi/conduit';

export function Layout() {
  const { loading } = useStore(({ app }) => app);
  return (
    <Fragment>
      {!loading && (
        <Fragment>
          <Header />
          <Outlet />
          <Footer />
        </Fragment>
      )}
    </Fragment>
  );
}
