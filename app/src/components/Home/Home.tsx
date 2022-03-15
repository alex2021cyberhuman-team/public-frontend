import React, { useEffect } from 'react';
import Banner from '../Banner/Banner';
import { ContainerPage } from '../ContainerPage/ContainerPage';
import { getHomePageTabs } from './getHomePageTabs';
import { observer } from 'mobx-react-lite';
import { ArticlesViewer } from '../ArticlesViewer/ArticlesViewer';
import { HomeSidebar } from './HomeSidebar';
import { globalStore } from '../../store/globalStore';

function Home() {
    const store = globalStore.home;
    useEffect(() => {
        store.onLoadArticlesAsync()
    }, [store]);

    return (
        <div className='home-page'>
            <Banner/>
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
                        onFavoriteToggleAsync={store.onFavoriteToggledAsync}/>
                </div>

                <div className='col-md-3'>
                    <HomeSidebar tags={store.tags} onTagChange={store.onTagChange}/>
                </div>
            </ContainerPage>
        </div>
    );
}

export default observer(Home);