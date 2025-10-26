import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';
import { IModalData } from '../../types';

/**
 * Класс модального окна
 * Управляет отображением контента в модальном окне и обработкой событий открытия/закрытия
 */
export class Modal extends Component<IModalData> {
    protected _closeButton: HTMLButtonElement;
    protected _content: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this._closeButton = ensureElement<HTMLButtonElement>('.modal__close', this.container);
        this._content = ensureElement<HTMLElement>('.modal__content', this.container);

        this._closeButton.addEventListener('click', this.close.bind(this));
        this.container.addEventListener('mousedown', (evt) => {
            if (evt.target === evt.currentTarget) {
                this.close();
            }
        });
        document.addEventListener('keydown', (evt) => {
            if (evt.key === 'Escape') {
                this.close();
            }
        });
    }

    /**
     * Установить контент модального окна
     */
    set content(value: HTMLElement) {
        this._content.replaceChildren(value);
    }

    /**
     * Открыть модальное окно
     */
    open() {
        this.toggleClass(this.container, 'modal_active', true);
        this.events.emit('modal:open');
    }

    /**
     * Закрыть модальное окно
     */
    close() {
        this.toggleClass(this.container, 'modal_active', false);
        this._content.replaceChildren();
        this.events.emit('modal:close');
    }

    /**
     * Отобразить модальное окно с контентом
     */
    render(data: IModalData): HTMLElement {
        super.render(data);
        this.open();
        return this.container;
    }
}
