import LocalizedStrings from 'react-localization';

const localizedStrings = new LocalizedStrings({
    en: {
        articleEditor: {
            submitButtonText: 'Publish Article',
            title: 'Article Title',
            description: 'What\'s this article about',
            body: 'Write your article (markdown will be supported)',
            tag: 'Enter tag and press enter'
        },
        home: {
            banner: {
                logoTitle: 'Conduit',
                logoText: 'A place to share your knowledge.'
            },
            feed: {
                yourFeed: 'Your Feed',
                globalFeed: 'Global Feed'
            },
            tags: {
                load: 'Loading tags...',
                popularTags: 'Popular Tags'
            }
        },
        header: {
            logoTitle: 'conduit',
            login: 'Sign in',
            register: 'Sign up',
            newArticle: 'New Article',
            settings: 'Settings',
            homePage: 'Home'
        },
        profile: {
            myArticles: 'My Articles',
            favoritedArticles: 'Favorited Articles'
        }
    },
    ru: {
        articleEditor: {
            submitButtonText: 'Опубликовать Статью',
            title: 'Заголовок статьи',
            description: 'О чем будет статья?',
            body: 'Напишите вашу статью (markdown будет поддерживаться)',
            tag: 'Введите название тега и нажмите \'Enter\''
        },
        home: {
            banner: {
                logoTitle: 'Проводник',
                logoText: 'Место, где вы можете делиться своими знаниями.'
            },
            feed: {
                yourFeed: 'Ваша лента',
                globalFeed: 'Общая лента'
            },
            tags: {
                load: 'Загрузка тегов...',
                popularTags: 'Популярные теги'
            }
        },
        header: {
            logoTitle: 'проводник',
            login: 'Войти',
            register: 'Зарегистрироваться',
            newArticle: 'Новая статья',
            settings: 'Настройки',
            homePage: 'Главная'
        },
        profile: {
            myArticles: 'Мои статьи',
            favoritedArticles: 'Понравившееся статьи'
        }
    }
});

export const languagesTranslates = new Map<string, string>([
    ['en', 'English'],
    ['ru', 'Русский']
]);

export default localizedStrings;