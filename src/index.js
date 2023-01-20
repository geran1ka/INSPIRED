import './index.html';
import './index.scss';
import { API_URL, DATA } from './modules/const';
import { searchPageControler } from './modules/controller/searchController';
import { createCSSColors } from './modules/createCssColors';
import { createElement } from './modules/utils/createElement';
import { getData } from './modules/getData';

import { mainPageController } from './modules/controller/mainPageController';
import { categoryPageController } from './modules/controller/categoryPageController';
import { renderFooter } from './modules/render/renderFooter';
import { renderHeader } from './modules/render/renderHeader';
import { router } from './modules/utils/rooter';

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
            mainPageController();
        })
        
        router.on('women', () => {
            mainPageController('women');
        })
        
        router.on('men', () => {
            mainPageController('men');
        });

        router.on('/:gender/:category', categoryPageController);

        router.on('search', searchPageControler);
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

