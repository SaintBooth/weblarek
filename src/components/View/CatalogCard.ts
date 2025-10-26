import { Card } from './Card';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';
import { ICard } from '../../types';
import { categoryMap } from '../../utils/constants';

/**
 * Класс карточки товара для каталога
 * Отображается в галерее на главной странице
 */
export class CatalogCard extends Card<ICard> {
    protected _category: HTMLElement;
    protected _image: HTMLImageElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container, events);
        this._category = ensureElement<HTMLElement>('.card__category', this.container);
        this._image = ensureElement<HTMLImageElement>('.card__image', this.container);

        this.container.addEventListener('click', () => {
            this.events.emit('card:select', { id: this._id });
        });
    }

    /**
     * Установить категорию товара
     */
    set category(value: string) {
        this.setText(this._category, value);
        const categoryClass = categoryMap[value as keyof typeof categoryMap];
        if (categoryClass) {
            this._category.className = 'card__category';
            this._category.classList.add(categoryClass);
        }
    }

    /**
     * Установить изображение товара
     */
    set image(value: string) {
        this.setImage(this._image, value, this._title.textContent || '');
    }
}
