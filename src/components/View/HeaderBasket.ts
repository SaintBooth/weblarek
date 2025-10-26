import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';

/**
 * Интерфейс для данных корзины в шапке
 */
interface IHeaderBasket {
    counter: number;
}

/**
 * Класс для кнопки корзины и счетчика в шапке сайта
 * Отвечает за отображение количества товаров и обработку клика
 */
export class HeaderBasket extends Component<IHeaderBasket> {
    protected _button: HTMLButtonElement;
    protected _counter: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this._button = ensureElement<HTMLButtonElement>('.header__basket', this.container);
        this._counter = ensureElement<HTMLElement>('.header__basket-counter', this.container);

        this._button.addEventListener('click', () => {
            this.events.emit('basket:open');
        });
    }

    /**
     * Установить количество товаров в счетчике
     */
    set counter(value: number) {
        this.setText(this._counter, String(value));
    }
}
