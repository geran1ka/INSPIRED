import { renderCard } from "../render/renderCard";
import { renderCart } from "../render/renderCart";
import { renderHero } from "../render/renderHero";
import { renderNavigation } from "../render/renderNavigation";
import { renderOrder } from "../render/renderOrder";
import { renderProducts } from "../render/renderProducts";

export const getCart = () => JSON.parse(localStorage.getItem('cart') || '[]');

export const addProductCart = (product) => {
    let isCart = false;

    const productList = getCart().map(item => {
        if (item.id === product.id && item.color === product.color && item.size === product.size) {
            item.count = +item.count + +product.count;
            isCart = true;
        }


        return item;
    });

    if(!isCart) {
        productList.push(product);
    };

    localStorage.setItem('cart', JSON.stringify(productList));
}

export const cartController = () => {

    renderNavigation({render: false});
    renderHero({render: false});
    renderCard({render: false});
    renderProducts({render: false}); 
    renderCart({render: true});
    renderOrder({render: true});
}