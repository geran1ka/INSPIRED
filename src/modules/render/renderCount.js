import { countController } from '../controllers/countController';
import { createElement } from '../utils/createElement'

export const renderCount = (count, className, returnCount = () => {}) => {
  const control = createElement(
    'div',
    {
      className: `${className} count`,
    }
  );

  const minus = createElement(
    'button',
    {
      className: 'count__item count__minus',
      type: 'button',
      textContent: '-'
    },
    {
      parent: control
    }
  );

  const number = createElement(
    'span',
    {
      className: 'count__item count__number',
      textContent: count
    },
    {
      parent: control
    }
  );

  const plus = createElement(
    'button',
    {
      className: 'count__item count__plus',
      type: 'button',
      textContent: '+'
    },
    {
      parent: control
    }
  );

  const input = createElement(
    'input',
    {
      type: 'hidden',
      value: count,
      name: 'count',
    },
    {
      parent: control
    }
  );

  countController(minus, number, plus, input, returnCount);

  return control;
}

/*
<div class="card__count count">
        <button class="count__item count__minus">-</button>
        <span class="count__item count__number">1</span>
        <button class="count__item count__plus">+</button>
        <input type="hidden" name="count" value="1">
      </div>
*/
