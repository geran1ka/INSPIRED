
import {API_URL, cart, products} from '../const';
import { getCart } from '../controller/cartController';
import { getData } from '../getData';
import {createElement} from '../utils/createElement'

export const renderCart = (render) => {
    cart.textContent = '';

    if (!render) {
        return;
    }

    const container = createElement('div', {
        className: 'container',
        innerHTML: `<h2 class="cart__title">Корзина</h2>`,
    }, {
        parent: cart,
    });

    const cartList = createElement('ul', {
        className: 'cart__list',
    }, {
        parent: container,
    });

    getCart().forEach(async product => {
        const data = await getData(`${API_URL}/api/goods/${product.id}`)

        const li = createElement('li', {
            className: 'cart__item',
        }, {
            parent: cartList,
        });

        const article = createElement('article', {
            className: 'item',
        }, {
            parent: li,
        });

        article.insertAdjacentHTML('beforeend', `
            <img src="${API_URL}/${data.pic}" alt="${data.title}" class="item__image">

                <div class="item__content">
                    <h3 class="item__title">${data.title}</h3>

                    <p class="item__price">руб ${data.price}</p>

                    <div class="item__vendor-code">
                        <span class="item__subtitle">Артикул</span>
                        <span class="item__id">${product.id}</span>
                    </div>
                </div>

                <div class="item__prop">
                    <div class="item__color">
                        <p class="item__subtitle item__color-title">Цвет</p>

                        <div class="item__color-item color color_${product.color} color_check"></div>
                    </div>

                    <div class="item__size">
                        <p class="item__subtitle item__size-title">Размер</p>

                        <div class="item__size-item size">${product.size}</div>
                    </div>
                </div>

        `)
    });

    const cartTotal = createElement('div', {
        className: 'cart__total',
        
        innerHTML: `<p class="cart__total-title">Итого:</p>`
    }, {
        parent: container,
    });

    const totalPrice = createElement('p', {
        className: 'cart__total-privateDecrypt',
        textContent: 'руб 0'
    }, {
        parent: cartTotal
    });
};

/*
<div class="container">

            <ul class="cart__list">
                <li class="cart__item">
                    <article class="item">
                        <img src="img/card-img.jpg" alt="Пижама со штанами шелковая" class="item__image">

                        <div class="item__content">
                            <h3 class="item__title">Пижама со штанами шелковая</h3>

                            <p class="item__price">руб 6999</p>

                            <div class="item__vendor-code">
                                <span class="item__subtitle">Артикул</span>
                                <span class="item__id">089083</span>
                            </div>
                        </div>

                        <div class="item__prop">
                            <div class="item__color">
                                <p class="item__subtitle item__color-title">Цвет</p>

                                <div class="item__color-item color color_black color_check"></div>
                            </div>

                            <div class="item__size">
                                <p class="item__subtitle item__size-title">Размер</p>

                                <div class="item__size-item size">XS</div>
                            </div>
                        </div>

                        <button class="item__del" aria-label="Удалить товар из корзины"></button>

                        <div class="count item__count">
                            <button class="count__item count__minus">-</button>
                            <span class="count__item count__number">1</span>
                            <button class="count__item count__plus">+</button>
                            <input type="hidden" name="count" value="1">
                        </div>
                    </article>
                </li>

                <li class="cart__item">
                    <article class="item">
                        <img src="img/cart-img.jpg" alt="Бюстгальтер-Балконет Prague Full Cover" class="item__image">

                        <div class="item__content">
                            <h3 class="item__title">Бюстгальтер-Балконет Prague Full Cover</h3>

                            <p class="item__price">руб 2599</p>

                            <div class="item__vendor-code">
                                <span class="item__subtitle">Артикул</span>
                                <span class="item__id">084375</span>
                            </div>
                        </div>

                        <div class="item__prop">
                            <div class="item__color">
                                <p class="item__subtitle item__color-title">Цвет</p>

                                <div class="item__color-item color color_black color_check"></div>
                            </div>

                            <div class="item__size">
                                <p class="item__subtitle item__size-title">Размер</p>

                                <div class="item__size-item size">M</div>
                            </div>
                        </div>

                        <button class="item__del" aria-label="Удалить товар из корзины"></button>

                        <div class="count item__count">
                            <button class="count__item count__minus">-</button>
                            <span class="count__item count__number">1</span>
                            <button class="count__item count__plus">+</button>
                            <input type="hidden" name="count" value="1">
                        </div>
                    </article>
                </li>
            </ul>

            <div class="cart__total">
                <p class="cart__total-title">Итого:</p>

                <p class="cart__total-price">руб 9598</p>
            </div>
        </div>


        
                <button class="item__del" aria-label="Удалить товар из корзины"></button>

                <div class="count item__count">
                    <button class="count__item count__minus">-</button>
                    <span class="count__item count__number">1</span>
                    <button class="count__item count__plus">+</button>
                    <input type="hidden" name="count" value="1">
                </div>
*/