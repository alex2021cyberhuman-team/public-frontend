import { NavigateFunction } from 'react-router-dom';
import { getProfile } from '../../../services/webapi/conduit';
import { store } from '../../../state/store';
import { loadArticles, startLoadingArticles } from '../../ArticlesViewer/ArticlesViewer.slice';
import { initializeProfile, loadProfile } from './ProfilePage.slice';
import { getArticlesByType } from './getArticlesByType';

export async function onLoad(username: string, favorites: boolean, navigate: NavigateFunction) {
  store.dispatch(initializeProfile());
  store.dispatch(startLoadingArticles());

  try {
    const profile = await getProfile(username);
    store.dispatch(loadProfile(profile));
    const articles = await getArticlesByType(username, favorites);
    store.dispatch(loadArticles(articles));
  } catch {
    navigate('/');
  }
}
