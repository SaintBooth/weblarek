import { Form } from './Form';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';
import { IOrderForm, TPayment } from '../../types';

/**
 * Класс формы заказа (способ оплаты и адрес)
 * Первый шаг оформления заказа
 */
export class OrderForm extends Form<IOrderForm> {
    protected _cardButton: HTMLButtonElement;
    protected _cashButton: HTMLButtonElement;

    constructor(container: HTMLFormElement, protected events: IEvents) {
        super(container, events);
        this._cardButton = ensureElement<HTMLButtonElement>('button[name="card"]', this.container);
        this._cashButton = ensureElement<HTMLButtonElement>('button[name="cash"]', this.container);

        this._cardButton.addEventListener('click', () => {
            this.onInputChange('payment', 'card');
        });

        this._cashButton.addEventListener('click', () => {
            this.onInputChange('payment', 'cash');
        });
    }

    /**
     * Установить выбранный способ оплаты
     */
    setPaymentMethod(method: TPayment): void {
        this.toggleClass(this._cardButton, 'button_alt-active', method === 'card');
        this.toggleClass(this._cashButton, 'button_alt-active', method === 'cash');
    }
}
