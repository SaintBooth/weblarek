import { CatalogCard } from './CatalogCard';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';

/**
 * Класс карточки товара для предпросмотра
 * Отображается в модальном окне с подробной информацией
 */
export class PreviewCard extends CatalogCard {
    protected _description: HTMLElement;
    protected _button: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container, events);
        this._description = ensureElement<HTMLElement>('.card__text', this.container);
        this._button = ensureElement<HTMLButtonElement>('.card__button', this.container);

        this._button.addEventListener('click', () => {
            this.events.emit('card:add', { id: this._id });
        });
    }

    /**
     * Установить описание товара
     */
    set description(value: string) {
        this.setText(this._description, value);
    }

    /**
     * Установить состояние кнопки добавления в корзину
     * @param inBasket - товар уже в корзине
     * @param price - цена товара (null если бесценный)
     */
    setButtonState(inBasket: boolean, price: number | null): void {
        if (inBasket) {
            this._button.textContent = 'Уже в корзине';
            this.setDisabled(this._button, true);
        } else if (price === null) {
            this._button.textContent = 'Не продается';
            this.setDisabled(this._button, true);
        } else {
            this._button.textContent = 'В корзину';
            this.setDisabled(this._button, false);
        }
    }
}
