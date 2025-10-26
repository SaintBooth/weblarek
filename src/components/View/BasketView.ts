import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';
import { IBasketView } from '../../types';

/**
 * Класс представления корзины
 * Управляет отображением списка товаров и общей стоимости
 */
export class BasketView extends Component<IBasketView> {
    protected _list: HTMLElement;
    protected _total: HTMLElement;
    protected _button: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this._list = ensureElement<HTMLElement>('.basket__list', this.container);
        this._total = ensureElement<HTMLElement>('.basket__price', this.container);
        this._button = ensureElement<HTMLElement>('.basket__button', this.container);

        if (this._button) {
            this._button.addEventListener('click', () => {
                events.emit('order:start');
            });
        }
    }

    /**
     * Установить список товаров в корзине
     */
    set items(items: HTMLElement[]) {
        if (items.length) {
            this._list.replaceChildren(...items);
            this.setDisabled(this._button, false);
        } else {
            this._list.replaceChildren(document.createElement('p'));
            this.setDisabled(this._button, true);
        }
    }

    /**
     * Установить общую стоимость товаров
     */
    set total(total: number) {
        this.setText(this._total, `${total} синапсов`);
    }
}
