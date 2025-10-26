import { Form } from './Form';
import { IEvents } from '../base/Events';
import { IOrderForm } from '../../types';

/**
 * Класс формы контактов (email и телефон)
 * Второй шаг оформления заказа
 */
export class ContactsForm extends Form<IOrderForm> {
    constructor(container: HTMLFormElement, protected events: IEvents) {
        super(container, events);
    }
}
