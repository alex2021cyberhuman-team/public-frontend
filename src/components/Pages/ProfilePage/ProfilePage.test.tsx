import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { Link, MemoryRouter, Route } from 'react-router-dom';
import { followUser, getArticles, getProfile, unfollowUser } from '../../../services/webapi/conduit';
import { store } from '../../../state/store';
import { Profile } from '../../../types/profile';
import { loadLanguage, loadUser } from '../../App/App.slice';
import { ProfilePage } from './ProfilePage';

jest.mock('../../../services/webapi/conduit.ts');

const mockedFollowUser = followUser as jest.Mock<ReturnType<typeof followUser>>;
const mockedUnfollowUser = unfollowUser as jest.Mock<ReturnType<typeof unfollowUser>>;
const mockedGetArticles = getArticles as jest.Mock<ReturnType<typeof getArticles>>;

const defaultProfile: Profile = {
  username: '',
  bio: '',
  image: null,
  following: false,
};
const mockedGetProfile = getProfile as jest.Mock<ReturnType<typeof getProfile>>;
mockedGetProfile.mockResolvedValue(defaultProfile);

const defaultArticle = {
  author: {
    bio: null,
    following: false,
    image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
    username: 'Jazmin Martinez',
  },
  body: 'Test 1',
  createdAt: new Date(),
  description: 'Test 1',
  favorited: false,
  favoritesCount: 0,
  slug: 'test-pmy91z',
  tagList: [],
  title: 'Test',
  updatedAt: new Date(),
};

beforeEach(async () => {
  await act(async () => {
    store.dispatch(
      loadUser({
        email: 'jake@jake.jake',
        token: 'jwt.token.here',
        username: 'jake',
        bio: 'I work at statefarm',
        image: null,
      })
    );
    location.pathname = '#/profile/something/';
  });
});

async function renderWithPath(profile: string) {
  await act(async () => {
    render(
      <MemoryRouter initialEntries={[`/${profile}`]}>
        <Route path='/:username'>
          <ProfilePage />
          <Link to={`/${profile}`}>Normal</Link>
          <Link to={`/${profile}/favorites`}>Favorites</Link>
        </Route>
      </MemoryRouter>
    );
  });
}

it('Should return to homepage if get profile fails', async () => {
  location.pathname = '#/profile/something';
  mockedGetProfile.mockRejectedValueOnce({});

  await act(async () => {
    await renderWithPath('something');
  });

  expect(location.pathname === '#/').toBeTruthy();
});

it('Should load profile', async () => {
  location.pathname = '#/profile/something';
  mockedGetProfile.mockResolvedValueOnce({
    ...defaultProfile,
    username: 'The Jake',
    bio: 'The Great',
  });
  mockedGetArticles.mockResolvedValueOnce({ articles: [], articlesCount: 0 });

  await act(async () => {
    await renderWithPath('something');
  });

  expect(location.pathname === '#/profile/something').toBeTruthy();
  expect(screen.getByText('The Jake')).toBeInTheDocument();
  expect(screen.getByText('The Great')).toBeInTheDocument();
});

it('Should go to sign up page if a guest tries to follow', async () => {
  location.pathname = '#/profile/something';
  mockedGetProfile.mockResolvedValueOnce({
    ...defaultProfile,
    username: 'The Jake',
    bio: 'The Great',
  });
  mockedGetArticles.mockResolvedValueOnce({ articles: [], articlesCount: 0 });

  await act(async () => {
    store.dispatch(loadLanguage());
    await renderWithPath('something');
  });

  await act(async () => {
    fireEvent.click(screen.getByText('Follow The Jake'));
  });

  expect(location.pathname === '#/register').toBeTruthy();
});

it('Should follow user', async () => {
  mockedGetProfile.mockResolvedValueOnce({
    ...defaultProfile,
    username: 'The Jake',
    bio: 'The Great',
  });
  mockedFollowUser.mockResolvedValueOnce({ ...defaultProfile, following: true });
  mockedGetArticles.mockResolvedValueOnce({ articles: [], articlesCount: 0 });

  await act(async () => {
    await renderWithPath('something');
  });

  await act(async () => {
    fireEvent.click(screen.getByText('Follow The Jake'));
  });

  expect(mockedFollowUser.mock.calls).toHaveLength(1);
  expect(mockedFollowUser.mock.calls[0][0] === 'The Jake').toBeTruthy();
  expect(store.getState().profile.profile.unwrap().following).toBeTruthy();
});

it('Should unfollow user', async () => {
  mockedGetProfile.mockResolvedValueOnce({
    ...defaultProfile,
    username: 'The Jake',
    bio: 'The Great',
    following: true,
  });
  mockedUnfollowUser.mockResolvedValueOnce({ ...defaultProfile, following: false });
  mockedGetArticles.mockResolvedValueOnce({ articles: [], articlesCount: 0 });

  await act(async () => {
    await renderWithPath('something');
  });

  await act(async () => {
    fireEvent.click(screen.getByText('Unfollow The Jake'));
  });

  expect(mockedUnfollowUser.mock.calls).toHaveLength(1);
  expect(mockedUnfollowUser.mock.calls[0][0] === 'The Jake').toBeTruthy();
  expect(store.getState().profile.profile.unwrap().following).toBeFalsy();
});

it('Should load articles for profile user', async () => {
  location.pathname = '#/profile/something';
  mockedGetProfile.mockResolvedValueOnce({
    ...defaultProfile,
    username: 'jake',
    bio: 'The Great',
    following: true,
  });
  mockedGetArticles.mockResolvedValueOnce({
    articles: [{ ...defaultArticle, title: 'The Article IS HERE!' }],
    articlesCount: 1,
  });

  await act(async () => {
    await renderWithPath('jake');
  });

  expect(mockedGetArticles.mock.calls).toHaveLength(1);
  expect(mockedGetArticles.mock.calls[0][0]).toHaveProperty('author', 'jake');
  expect(screen.getByText('The Article IS HERE!')).toBeInTheDocument();
});

it('Should load favorite articles for profile user', async () => {
  location.pathname = '#/profile/jake/favorites';
  mockedGetProfile.mockResolvedValueOnce({
    ...defaultProfile,
    username: 'jake',
    bio: 'The Great',
    following: true,
  });
  mockedGetArticles.mockResolvedValueOnce({
    articles: [{ ...defaultArticle, title: 'The Article IS HERE! 2' }],
    articlesCount: 1,
  });

  await act(async () => {
    await renderWithPath('jake/favorites');
  });

  expect(mockedGetArticles.mock.calls).toHaveLength(1);
  expect(mockedGetArticles.mock.calls[0][0]).toHaveProperty('favorited', 'jake');
  expect(screen.getByText('The Article IS HERE! 2')).toBeInTheDocument();
});

it('Should load articles for profile user then favorites when Favorites is clicked', async () => {
  location.pathname = '#/profile/something';
  mockedGetProfile.mockResolvedValueOnce({
    ...defaultProfile,
    username: 'jake',
    bio: 'The Great',
    following: true,
  });
  mockedGetArticles.mockResolvedValueOnce({
    articles: [{ ...defaultArticle, title: 'The Article IS HERE!' }],
    articlesCount: 1,
  });

  await act(async () => {
    await renderWithPath('jake');
  });

  expect(screen.getByText('The Article IS HERE!')).toBeInTheDocument();

  mockedGetArticles.mockResolvedValueOnce({
    articles: [{ ...defaultArticle, title: 'The Article IS HERE! after' }],
    articlesCount: 1,
  });

  await act(async () => {
    fireEvent.click(screen.getByText('Favorited Articles'));
  });

  expect(mockedGetArticles.mock.calls).toHaveLength(2);
  expect(mockedGetArticles.mock.calls[0][0]).toHaveProperty('author', 'jake');
  expect(mockedGetArticles.mock.calls[1][0]).toHaveProperty('favorited', 'jake');
  expect(screen.getByText('The Article IS HERE! after')).toBeInTheDocument();
  expect(location.pathname === '#/profile/jake/favorites');
});

it('Should load favorite articles for profile user then normal articles', async () => {
  location.pathname = '#/profile/something/favorites';
  mockedGetProfile.mockResolvedValueOnce({
    ...defaultProfile,
    username: 'jake',
    bio: 'The Great',
    following: true,
  });
  mockedGetArticles.mockResolvedValueOnce({
    articles: [{ ...defaultArticle, title: 'The Article IS HERE!' }],
    articlesCount: 1,
  });

  await act(async () => {
    await renderWithPath('jake/favorites');
  });

  expect(screen.getByText('The Article IS HERE!')).toBeInTheDocument();

  mockedGetArticles.mockResolvedValueOnce({
    articles: [{ ...defaultArticle, title: 'The Article IS HERE! after' }],
    articlesCount: 1,
  });

  await act(async () => {
    fireEvent.click(screen.getByText('My Articles'));
  });

  expect(mockedGetArticles.mock.calls).toHaveLength(2);
  expect(mockedGetArticles.mock.calls[0][0]).toHaveProperty('favorited', 'jake');
  expect(mockedGetArticles.mock.calls[1][0]).toHaveProperty('author', 'jake');
  expect(screen.getByText('The Article IS HERE! after')).toBeInTheDocument();
  expect(location.pathname === '#/profile/jake');
});

it('Should change page', async () => {
  location.pathname = '#/profile/something/favorites';
  mockedGetProfile.mockResolvedValueOnce({
    ...defaultProfile,
    username: 'jake',
    bio: 'The Great',
    following: true,
  });
  mockedGetArticles.mockResolvedValueOnce({
    articles: [{ ...defaultArticle, title: 'The Article IS HERE!' }],
    articlesCount: 100,
  });

  await act(async () => {
    await renderWithPath('jake/favorites');
  });

  expect(screen.getByText('The Article IS HERE!')).toBeInTheDocument();

  mockedGetArticles.mockResolvedValueOnce({
    articles: [{ ...defaultArticle, title: 'The Article IS HERE! after' }],
    articlesCount: 100,
  });

  await act(async () => {
    fireEvent.click(screen.getByLabelText(/Go to page number 5/));
  });

  expect(mockedGetArticles.mock.calls).toHaveLength(2);
  expect(mockedGetArticles.mock.calls[0][0]).toHaveProperty('favorited', 'jake');
  expect(mockedGetArticles.mock.calls[1][0]).toHaveProperty('favorited', 'jake');
  expect(mockedGetArticles.mock.calls[1][0]).toHaveProperty('offset', 40);
  expect(screen.getByText('The Article IS HERE! after')).toBeInTheDocument();
  expect(location.pathname === '#/profile/jake');
});
