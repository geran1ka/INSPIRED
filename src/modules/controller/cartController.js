import { API_URL } from "../const";
import { getData } from "../getData";
import { renderCard } from "../render/renderCard";
import { renderCart } from "../render/renderCart";
import { renderHero } from "../render/renderHero";
import { renderNavigation } from "../render/renderNavigation";
import { renderOrder } from "../render/renderOrder";
import { renderProducts } from "../render/renderProducts";

export const cartCoodsStore = {
    goods: [],
    _add(product) {
        if (!this.goods.some(item => item.id === product.id)) {
            this.goods.push(product);
        }
    },
    add(goods) {
        if (Array.isArray(goods)) {
            goods.forEach(product => {
                this._add(product);
            })
        } else {
            this._add(goods);
        }
    },
    getProduct(id) {
        return this.goods.find(item => item.id === id)
    }
}

export const getCart = () => JSON.parse(localStorage.getItem('cart') || '[]');

export const addProductCart = (product, equal) => {
    let isCart = false;

    const productList = getCart().map(item => {
        if (item.id === product.id && item.color === product.color && item.size === product.size) {
            if (equal) {
                item.count = product.count;
            } else {
                item.count = +item.count + +product.count;
            }
            
            isCart = true;
        }


        return item;
    });

    if(!isCart) {
        productList.push(product);
    };

    localStorage.setItem('cart', JSON.stringify(productList));
}

export const calcTotalPrice = {
    elemTotalPrice: null,
    elemCount: null,
    update() {
        const cartGoods = getCart();
        this.count = cartGoods.length;
        this.totalPrice = cartGoods.reduce((sum, item) => {
            const product = cartCoodsStore.getProduct(item.id);
            return product.price * item.count + sum;
        }, 0);
        this.wtiteTotal();
    }, 
    wtiteTotal(elem = this.elemTotalPrice) {
        if (elem) {
            this.elemTotalPrice = elem;
            elem.textContent = this.totalPrice;
        }

    }
}

export const removeCart = (product) => {
    const productList = getCart().filter(item => !(item.id === product.id && item.color === product.color && item.size === product.size))
    
    localStorage.setItem('cart', JSON.stringify(productList));
    return true;
}

export const clearCart = () => {
    localStorage.removeItem('cart');
}

export const cartController =async () => {
    const idList = getCart().map(item => item.id);
    const data = await getData(`${API_URL}/api/goods?list=${[idList]}&count=all`);

    cartCoodsStore.add(data);

    renderNavigation({render: false});
    renderHero({render: false});
    renderCard({render: false});
    renderProducts({render: false}); 
    renderCart({render: true, cartCoodsStore});
    renderOrder({render: true});
}