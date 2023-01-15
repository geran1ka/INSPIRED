import './index.html';
import './index.scss';
import { API_URL, DATA } from './modules/const';
import { createCSSColors } from './modules/createCssColors';
import { getData } from './modules/getData';

import { mainPage } from './modules/mainPage/mainPage';
import { menMainPage } from './modules/mainPage/menMainPage';
import { womenMainPage } from './modules/mainPage/womenMainPage';
import { renderFooter } from './modules/render/renderFooter';
import { renderHeader } from './modules/render/renderHeader';
import { router } from './modules/rooter';

const init = async () => {
    DATA.navigation = await getData(`${API_URL}/api/categories`);
    DATA.colors = await getData(`${API_URL}/api/colors`)

    createCSSColors(DATA.colors)

    router.on('*', () => {
        renderHeader();
        renderFooter();
    })
    
    router.on('/', () => {
        mainPage();
    })
    
    router.on('women', () => {
        womenMainPage();
    })
    
    router.on('men', () => {
        menMainPage();
    })
    /*
    setTimeout(() => {
        router.navigate('men');
    }, 3000)
    
    setTimeout(() => {
        router.navigate('women');
    }, 6000)
    */
    router.resolve();

}

init()  
;

