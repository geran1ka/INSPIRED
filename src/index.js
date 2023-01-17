import './index.html';
import './index.scss';
import { API_URL, DATA } from './modules/const';
import { createCSSColors } from './modules/createCssColors';
import { createElement } from './modules/createElement';
import { getData } from './modules/getData';

import { mainPage } from './modules/mainPage/mainPage';
import { categoryPage } from './modules/render/categoryPage';
import { renderFooter } from './modules/render/renderFooter';
import { renderHeader } from './modules/render/renderHeader';
import { router } from './modules/rooter';

const init = async () => {
    try {
        router.on('*', () => {
            renderHeader();
            renderFooter();
        });

        DATA.navigation = await getData(`${API_URL}/api/categories`);
        DATA.colors = await getData(`${API_URL}/api/colors`)

        createCSSColors(DATA.colors)

        router.on('/', () => {
            mainPage();
        })
        
        router.on('women', () => {
            mainPage('women');
        })
        
        router.on('men', () => {
            mainPage('men');
        });

        router.on('/:gender/:category', categoryPage);

        router.on('search', (data) => {
            console.log(data);
            
        });
        /*
        setTimeout(() => {
            router.navigate('men');
        }, 3000)
        
        setTimeout(() => {
            router.navigate('women');
        }, 6000)
        */
        


    } catch (e) {
        createElement('h2', {
            textContent: 'Что-то пошло не так, попробуйте позже',
        }, {
            parent: document.querySelector('main'),
            cb(h2) {
                h2.style.textAlign = 'center'
            }
        })
    } finally {
        router.resolve();
    }
}
init();  

