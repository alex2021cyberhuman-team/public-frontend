import { act, fireEvent, render, screen } from '@testing-library/react';
import { store } from '../../state/store';
import { ArticleEditor } from './ArticleEditor';
import { addTag, initializeEditor, updateField } from './ArticleEditor.slice';
import React from 'react';

beforeEach(() => {
  act(() => {
    store.dispatch(initializeEditor());
    render(<ArticleEditor onSubmit={(ev) => ev.preventDefault()} />);
  });
});

it('Should update article text fields', async () => {
  const localization = store.getState().app.localization;
  await act(async () => {
    fireEvent.change(screen.getByPlaceholderText(localization.articleEditor.title), { target: { value: 'testTitle' } });
    fireEvent.change(screen.getByPlaceholderText(localization.articleEditor.description), {
      target: { value: 'testDescription' },
    });
    fireEvent.change(screen.getByPlaceholderText(localization.articleEditor.body), {
      target: { value: 'testBody' },
    });
    store.dispatch(updateField({ name: 'tagList', value: 'df' }));
  });

  expect(store.getState().editor.article.title).toMatch('testTitle');
  expect(store.getState().editor.article.description).toMatch('testDescription');
  expect(store.getState().editor.article.body).toMatch('testBody');
});

it('Should update article tag list field', async () => {
  const localization = store.getState().app.localization;
  await act(async () => {
    const enterTagsElement = screen.getByPlaceholderText(localization.articleEditor.tag);
    fireEvent.keyDown(enterTagsElement, { key: 'Enter' });
    fireEvent.keyDown(enterTagsElement, { key: 'A' });

    fireEvent.change(enterTagsElement, { target: { value: 'tag1' } });
    fireEvent.keyUp(enterTagsElement, { key: 'Enter' });

    fireEvent.change(enterTagsElement, { target: { value: 'tag2' } });
    fireEvent.keyUp(enterTagsElement, { key: 'Enter' });

    fireEvent.change(enterTagsElement, { target: { value: 'tag3' } });
    fireEvent.keyUp(enterTagsElement, { key: 'Enter' });

    store.dispatch(addTag());

    fireEvent.keyUp(enterTagsElement, { key: 'k' });
  });

  expect(store.getState().editor.article.tagList).toHaveLength(3);
  expect(store.getState().editor.article.tagList).toContain('tag1');
  expect(store.getState().editor.article.tagList).toContain('tag2');
  expect(store.getState().editor.article.tagList).toContain('tag3');

  await act(async () => {
    fireEvent.click(screen.getByText('tag2'));
  });

  expect(store.getState().editor.article.tagList).toHaveLength(2);
  expect(store.getState().editor.article.tagList).toContain('tag1');
  expect(store.getState().editor.article.tagList).toContain('tag3');
});
