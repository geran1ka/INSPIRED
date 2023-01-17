import { createElement } from "../createElement";
import { router } from "../rooter";

export const renderPagination = (wrapperPagination, page, pages, count) => {
    wrapperPagination.textContent = '';

    const paginationList = createElement('ul', {
        className: 'pagination__list',
    }, {
        parent: wrapperPagination,
    });

    const isNotStart = page - Math.floor(count / 2) > 1;

    const isEnd = page + Math.floor(count / 2) > pages;

    for (let i = 0; i < count; i++) {
        let n = i + 1;
        if(isNotStart) {
            if (isEnd) {
                n = pages - count + i
            } else {
                n = pages - Math.floor(count / 2) + i
            }
        }
    
    createElement('li', {
        className: 'pagination__item',
    }, {
        parent: wrapperPagination,
        append: createElement('a', {
            className: `pagination__link ${page === n ? 'pagination__link_active' : ''}`,
            textContent: n,
            href: `${router.getCurrentLocation().url}?page=${n}`,
        })
    })
}
}