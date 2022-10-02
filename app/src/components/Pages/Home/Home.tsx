import React, { useEffect } from 'react';
import Banner from '../../SharedComponents/Banner/Banner';
import { ContainerPage } from '../../SharedComponents/ContainerPage/ContainerPage';
import { getHomePageTabs, globalFeedTab } from './services/getHomePageTabs';
import { observer } from 'mobx-react-lite';
import { ArticlesViewer } from '../../SharedComponents/ArticlesViewer/ArticlesViewer';
import { HomeSidebar } from './HomeSidebar';
import GlobalStore from '../../../store/globalStore';
import { useNavigate, useParams } from 'react-router-dom';
import { getLangHref } from '../../SharedComponents/NavItem/NavItem';
import { useLocalization } from '../../../services/localization/reactLocalization';
import { tab } from '@testing-library/user-event/dist/tab';

export default observer(function Home({
    store
}: {
    store: GlobalStore;
}) {
    const { tag: tagParam, tab: tabParam } = useParams();
    const navigate = useNavigate();
    const tabs = getHomePageTabs();
    const {language} = useLocalization();
    useEffect(() => {
        if (!store.home.checkParams(tagParam, tabParam)){
            navigate(getLangHref(language, '/'))
        } else {
            store.home.onLoadArticlesAsync()
        }
    }, [store]);
    return (
        <div className='home-page'>
            <Banner />
            <ContainerPage>
                <div className='col-md-9'>
                    <ArticlesViewer
                        toggleClassName='feed-toggle'
                        tabsTranslation={tabs}
                        selectedTab={store.home.selectedTab}
                        tabs={store.home.tabs}
                        onPageChange={(index) => store.home.onPageChange(index)}
                        onTabChange={(tab) => navigate(`/${tab}`)}
                        articles={store.home.articles}
                        articlesCount={store.home.articlesCount}
                        currentPage={store.home.currentPage}
                        favoriteDisabled={store.home.favoriteDisabled}
                        onFavoriteToggleAsync={(index, model) => store.home.onFavoriteToggledAsync(index, model)} />
                </div>

                <div className='col-md-3'>
                    <HomeSidebar tags={store.home.tags} onTagChange={(tag) => navigate(getLangHref(language, `/${globalFeedTab}/${tag}`))} />
                </div>
            </ContainerPage>
        </div>
    );
});