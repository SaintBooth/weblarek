import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';
import { IFormState } from '../../types';

/**
 * Базовый класс формы
 * Содержит общую логику для всех форм
 */
export abstract class Form<T> extends Component<IFormState> {
    protected _submit: HTMLButtonElement;
    protected _errors: HTMLElement;

    constructor(container: HTMLFormElement, protected events: IEvents) {
        super(container);

        this._submit = ensureElement<HTMLButtonElement>('button[type="submit"]', this.container);
        this._errors = ensureElement<HTMLElement>('.form__errors', this.container);

        this.container.addEventListener('input', (e: Event) => {
            const target = e.target as HTMLInputElement;
            const field = target.name as keyof T;
            const value = target.value;
            this.onInputChange(field, value);
        });

        this.container.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            this.events.emit('form:submit');
        });
    }

    /**
     * Обработка изменения поля ввода
     */
    protected onInputChange(field: keyof T, value: string) {
        this.events.emit('input:change', {
            field,
            value
        });
    }

    /**
     * Установить валидность формы
     */
    set valid(value: boolean) {
        this.setDisabled(this._submit, !value);
    }

    /**
     * Установить текст ошибок
     */
    set errors(value: string) {
        this.setText(this._errors, value);
    }
}
