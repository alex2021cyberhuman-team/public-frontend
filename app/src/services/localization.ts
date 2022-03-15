import LocalizedStrings from 'react-localization';
import { enGB, ru } from 'date-fns/locale';

export const localizedStrings = new LocalizedStrings({
    en: {
        article: {
            favorite: 'Favorite Article',
            unfavorite: 'Unfavorite Article',
            delete: 'Delete Article',
            edit: 'Edit Article',
            toggleFavorited: 'Toggle Favorite',
            readMore: 'Read more...',
            load: 'Loading article...'
        },
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
        footer: {
            attribution: "Blogging ecosystem developed by {0}. Code & design licensed under MIT.",
            logo: 'conduit'
        },
        profile: {
            myArticles: 'My Articles',
            favoritedArticles: 'Favorited Articles',
            loading: 'Loading profile...'
        },
        userInfo: {
            follow: 'Follow',
            unfollow: 'Unfollow',
            editProfile: 'Edit Profile Settings'
        },
        pagination: {
            goToPage: 'Go to page number {0}'
        },
        settings: {
            updateSettings: 'Update Settings',
            image: 'URL of profile picture',
            username: 'Your Name',
            bio: 'Short bio about you',
            email: 'Email',
            password: 'Password',
            pageHeader: 'Your Settings',
            logout: 'Or click here to logout.'
        },
        register: {
            username: 'Your Name',
            email: 'Email',
            password: 'Password',
            loginOption: 'Have an account?',
            pageHeader: 'Sign up',
            submit: 'Sign up'
        },
        login: {
            email: 'Email',
            password: 'Password',
            registerOption: 'Need an account?',
            pageHeader: 'Sign in'
        },
        viewer: {
            loading: 'Loading articles...',
            notArticles: 'No articles are here... yet.'
        },
        comment: {
            login: 'Sign in',
            register: 'sign up',
            info: '{0} or {1} to add comments on this article.',
            post: 'Post Comment',
            write: 'Write a comment...',
            loading: 'Loading comments...',
            delete: 'Delete comment {0}'
        }
    },
    ru: {
        article: {
            favorite: "Проголосовать",
            unfavorite: "Убрать голос",
            delete: 'Удалить статью',
            edit: 'Редактировать статью',
            toggleFavorited: 'Переключить голос',
            readMore: 'Читать далее...',
            load: 'Загрузка статьи...'
        },
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
        footer: {
            attribution: "Новостная платформа, разработаная {0}. Код и дезайн распространяются под лицензией MIT.",
            logo: 'проводник'
        },
        profile: {
            myArticles: 'Мои статьи',
            favoritedArticles: 'Понравившееся статьи',
            loading: 'Загрузка профиля...'
        },
        userInfo: {
            follow: 'Следить',
            unfollow: 'Перестать следить',
            editProfile: 'Редактировать настройки профиля'
        },
        pagination: {
            goToPage: 'Перейти на страницу под {0} номером'
        },
        settings: {
            updateSettings: 'Обновить настройки',
            image: 'Ссылка на аватар',
            username: 'Ваше пользовательское имя',
            bio: 'Ваша краткая биография',
            email: 'Электронная почта',
            password: 'Пароль',
            pageHeader: 'Ваши настройки',
            logout: 'Или нажмите что бы выйти.'
        },
        register: {
            username: 'Ваше пользовательское имя',
            email: 'Электронная почта',
            password: 'Пароль',
            loginOption: 'У вас уже есть аккаунт?',
            pageHeader: 'Зарегистрироваться',
            submit: 'Зарегистрироваться'
        },
        login: {
            email: 'Электронная почта',
            password: 'Пароль',
            registerOption: 'Вам нужен аккаунт?',
            pageHeader: 'Войти'
        },
        viewer: {
            loading: 'Загрузка статей...',
            notArticles: 'Нет статей... пока.'
        },
        comment: {
            login: 'Войдите',
            register: 'зарегистрируйтесь',
            info: '{0} или {1} чтобы оставить комментарий',
            post: 'Опубликовать комментарий',
            write: 'Напишите комментарий...',
            loading: 'Загрузка комментариев...',
            delete: 'Удалить комментарий {0}'
        }
    }
});

export const LOCALSTORAGE_LANGUAGE = 'language';

export const languagesTranslates = new Map<string, string>([
    ['en', 'English'],
    ['ru', 'Русский']
]);

export const dateFnsLocales = new Map<string, Locale>([
    ['ru', ru],
    ['en', enGB]
]);

export default localizedStrings;