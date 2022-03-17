import React, { FormEvent, useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { createArticle } from '../../../services/webapi/conduit';
import { store } from '../../../state/store';
import { ArticleEditor } from '../../ArticleEditor/ArticleEditor';
import { initializeEditor, startSubmitting, updateErrors } from '../../ArticleEditor/ArticleEditor.slice';

export function NewArticle() {
  useEffect(() => {
    store.dispatch(initializeEditor());
  }, [null]);
  const navigate = useNavigate();

  return <ArticleEditor onSubmit={(ev: FormEvent) => onSubmit(ev, navigate)} />;
}

async function onSubmit(ev: FormEvent, navigate: NavigateFunction) {
  ev.preventDefault();
  store.dispatch(startSubmitting());
  const result = await createArticle(store.getState().editor.article);

  result.match({
    err: (errors) => store.dispatch(updateErrors(errors)),
    ok: ({ slug }) => {
      navigate(`/article/${slug}`);
    },
  });
}
