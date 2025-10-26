import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';
import { ISuccess } from '../../types';

/**
 * Класс окна успешного оформления заказа
 * Отображается после успешной отправки заказа
 */
export class Success extends Component<ISuccess> {
    protected _close: HTMLElement;
    protected _total: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this._close = ensureElement<HTMLElement>('.order-success__close', this.container);
        this._total = ensureElement<HTMLElement>('.order-success__description', this.container);

        if (this._close) {
            this._close.addEventListener('click', () => {
                this.events.emit('success:close');
            });
        }
    }

    /**
     * Установить списанную сумму
     */
    set total(value: number) {
        this.setText(this._total, `Списано ${value} синапсов`);
    }
}
