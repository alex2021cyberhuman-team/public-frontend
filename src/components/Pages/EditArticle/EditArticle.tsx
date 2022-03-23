import React, { Fragment, useEffect } from 'react';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { getArticle, updateArticle } from '../../../services/webapi/conduit';
import { store } from '../../../state/store';
import { useStore } from '../../../state/storeHooks';
import { ArticleEditor } from '../../ArticleEditor/ArticleEditor';
import { initializeEditor, loadArticle, startSubmitting, updateErrors } from '../../ArticleEditor/ArticleEditor.slice';

export function EditArticle() {
  const { slug } = useParams<{ slug: string }>();
  if (!slug) {
    throw 'slug is undefined';
  }
  const { loading } = useStore(({ editor }) => editor);
  const navigate = useNavigate();
  useEffect(() => {
    if (slug) {
      _loadArticle(slug, navigate);
    }
    // noinspection JSIgnoredPromiseFromCall
  }, [slug]);

  return <Fragment>{!loading && <ArticleEditor onSubmit={onSubmit(slug, navigate)} />}</Fragment>;
}

async function _loadArticle(slug: string, navigate: NavigateFunction) {
  store.dispatch(initializeEditor());
  try {
    const { title, description, body, tagList, author } = await getArticle(slug);

    if (author.username !== store.getState().app.user.unwrap().username) {
      navigate('/');
      return;
    }

    store.dispatch(loadArticle({ title, description, body, tagList }));
  } catch {
    navigate('/');
  }
}

function onSubmit(slug: string, navigate: NavigateFunction): (ev: React.FormEvent) => void {
  return async (ev) => {
    ev.preventDefault();

    store.dispatch(startSubmitting());
    const article = store.getState().editor.article;
    const result = await updateArticle(slug, article);

    result.match({
      err: (errors) => store.dispatch(updateErrors(errors)),
      ok: ({ slug }) => {
        navigate(`/article/${slug}`);
      },
    });
  };
}
