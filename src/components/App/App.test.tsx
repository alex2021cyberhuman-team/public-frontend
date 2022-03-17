import React from 'react';
import { act, render, screen } from '@testing-library/react';
import axios from 'axios';
import { getArticles, getFeed, getTags, getUser } from '../../services/webapi/conduit';
import { store } from '../../state/store';
import { App } from './App';
import { loadLanguage } from './App.slice';

jest.mock('../../services/webapi/conduit.ts');
jest.mock('axios');

const mockedGetArticles = getArticles as jest.Mock<ReturnType<typeof getArticles>>;
//const mockedGetFeed = getFeed as jest.Mock<ReturnType<typeof getFeed>>;
const mockedGetTags = getTags as jest.Mock<ReturnType<typeof getTags>>;
const mockedGetUser = getUser as jest.Mock<ReturnType<typeof getUser>>;
const testToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjk5OTk5OTk5OTl9.Vg30C57s3l90JNap_VgMhKZjfc-p7SoBXaSAy8c28HA';

it('Should render home', async () => {
  act(() => {
    store.dispatch(loadLanguage());
  });
  mockedGetArticles.mockResolvedValueOnce({
    articles: [],
    articlesCount: 0,
  });
  mockedGetTags.mockResolvedValueOnce({ tags: [] });
  mockedGetUser.mockImplementationOnce(jest.fn());
  localStorage.clear();

  await act(async () => {
    await render(<App />);
  });

  expect(screen.getByText('A place to share your knowledge.')).toBeInTheDocument();
  expect(mockedGetUser.mock.calls.length).toBe(0);
  mockedGetUser.mockClear();
});

// it('Should end load if get user fails', async () => {
//     await act(async () => {
//         store.dispatch(initializeApp());
//     });
//     mockedGetUser.mockRejectedValue({lol: 123});
//     mockedGetArticles.mockResolvedValueOnce({
//         articles: [],
//         articlesCount: 0,
//     });
//     mockedGetTags.mockResolvedValueOnce({tags: []});
//     localStorage.setItem('token', testToken);
//
//     await act(async () => {
//         await render(<App/>);
//     });
//
//     expect(store.getState().app.user.isNone()).toBeTruthy();
//     expect(store.getState().app.loading).toBe(false);
// });
//
// // TODO: fix that test
// // it('Should get user if token is on storage', async () => {
// //     act(() => {
// //         store.dispatch(initializeApp());
// //     });
// //     mockedGetUser.mockResolvedValueOnce({
// //         email: 'jake@jake.jake',
// //         token: testToken,
// //         username: 'jake',
// //         bio: 'I work at statefarm',
// //         image: null,
// //     });
// //     mockedGetFeed.mockResolvedValueOnce({
// //         articles: [],
// //         articlesCount: 0,
// //     });
// //     mockedGetTags.mockResolvedValueOnce({tags: []});
// //     localStorage.setItem('token', testToken);
// //
// //     await act(async () => {
// //         await render(<App/>);
// //     });
// //
// //     expect(store.getState().app.user.isNone()).toBeTruthy();
// //     expect(store.getState().app.loading).toBe(false);
// // });
