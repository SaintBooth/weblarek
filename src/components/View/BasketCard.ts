import { Card } from './Card';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';
import { ICard } from '../../types';

/**
 * Класс карточки товара для корзины
 * Отображается в списке товаров в корзине
 */
export class BasketCard extends Card<ICard> {
    protected _index: HTMLElement;
    protected _button: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container, events);
        this._index = ensureElement<HTMLElement>('.basket__item-index', this.container);
        this._button = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);

        this._button.addEventListener('click', () => {
            this.events.emit('card:remove', { id: this._id });
        });
    }

    /**
     * Установить порядковый номер товара в корзине
     */
    set index(value: number) {
        this.setText(this._index, value);
    }
}
