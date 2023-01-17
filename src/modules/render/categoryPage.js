import { DATA } from "../const";
import { renderHero } from "./renderHero";
import { renderNavigation } from "./renderNavigation";
import { renderProducts } from "./renderProducts";

export const categoryPage = (routerData) => {
    const {gender, category} = routerData.data;
    const params = {gender, category};

    const title = DATA.navigation[gender].list.find(item => item.slug === category).title
    renderNavigation(gender, category);
    renderHero(false);
    renderProducts(title, params);    
}