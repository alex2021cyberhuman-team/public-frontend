import React, { useEffect } from 'react';
import Banner from '../../SharedComponents/Banner/Banner';
import { ContainerPage } from '../../SharedComponents/ContainerPage/ContainerPage';
import { getHomePageTabs } from './services/getHomePageTabs';
import { observer } from 'mobx-react-lite';
import { ArticlesViewer } from '../../SharedComponents/ArticlesViewer/ArticlesViewer';
import { HomeSidebar } from './HomeSidebar';
import { globalStore } from '../../../store/globalStore';
import { getOrReloadStateLanguage } from "../../../services/getOrReloadLanguage";

export default observer(() => {
    getOrReloadStateLanguage();
    const store = globalStore.home;
    useEffect(() => {
        store.onLoadArticlesAsync()
    }, [store]);

    return (
        <div className='home-page'>
            <Banner />
            <ContainerPage>
                <div className='col-md-9'>
                    <ArticlesViewer
                        toggleClassName='feed-toggle'
                        tabsTranslation={getHomePageTabs()}
                        selectedTab={store.selectedTab}
                        tabs={store.tabs}
                        onPageChange={store.onPageChange}
                        onTabChange={store.onTabChange}
                        articles={store.articles}
                        articlesCount={store.articlesCount}
                        currentPage={store.currentPage}
                        favoriteDisabled={store.favoriteDisabled}
                        onFavoriteToggleAsync={store.onFavoriteToggledAsync} />
                </div>

                <div className='col-md-3'>
                    <HomeSidebar tags={store.tags} onTagChange={store.onTagChange} />
                </div>
            </ContainerPage>
        </div>
    );
});