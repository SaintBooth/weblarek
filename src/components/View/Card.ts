import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';

/**
 * Базовый класс карточки товара
 * Содержит общую логику для всех типов карточек
 */
export abstract class Card<T> extends Component<T> {
    protected _title: HTMLElement;
    protected _price: HTMLElement;
    protected _id: string;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this._title = ensureElement<HTMLElement>('.card__title', this.container);
        this._price = ensureElement<HTMLElement>('.card__price', this.container);
    }

    /**
     * Установить ID товара
     */
    set id(value: string) {
        this._id = value;
    }

    /**
     * Установить название товара
     */
    set title(value: string) {
        this.setText(this._title, value);
    }

    /**
     * Установить цену товара
     */
    set price(value: number | null) {
        if (value === null) {
            this.setText(this._price, 'Бесценно');
        } else {
            this.setText(this._price, `${value} синапсов`);
        }
    }
}
