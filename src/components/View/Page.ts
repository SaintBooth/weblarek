import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';
import { IPage } from '../../types';

/**
 * Класс главной страницы приложения
 * Управляет отображением галереи товаров и блокировкой прокрутки
 */
export class Page extends Component<IPage> {
    protected _gallery: HTMLElement;
    protected _wrapper: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this._gallery = ensureElement<HTMLElement>('.gallery', this.container);
        this._wrapper = ensureElement<HTMLElement>('.page__wrapper', this.container);
    }

    /**
     * Установить галерею товаров
     */
    set gallery(items: HTMLElement[]) {
        this._gallery.replaceChildren(...items);
    }

    /**
     * Заблокировать/разблокировать прокрутку страницы
     */
    set locked(value: boolean) {
        this.toggleClass(this._wrapper, 'page__wrapper_locked', value);
    }
}
