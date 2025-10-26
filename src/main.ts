import './scss/styles.scss';
import { LarekAPI } from './components/LarekAPI';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/Events';
import { Products } from './components/Models/Products';
import { Basket } from './components/Models/Basket';
import { Buyer } from './components/Models/Buyer';
import { Page, Modal, CatalogCard, PreviewCard, BasketCard, Basket as BasketView, OrderForm, ContactsForm, Success } from './components/View';
import { cloneTemplate, ensureElement } from './utils/utils';
import { IOrder, IProduct } from './types';
import { Api } from './components/base/Api';

// ========================================
// Инициализация базовых компонентов
// ========================================
const events = new EventEmitter();
const api = new Api(API_URL);
const larekApi = new LarekAPI(api);

// ========================================
// Модели данных
// ========================================
const productsModel = new Products(events);
const basketModel = new Basket(events);
const buyerModel = new Buyer(events);

// ========================================
// Шаблоны
// ========================================
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

// ========================================
// Компоненты представления
// ========================================
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basketView = new BasketView(cloneTemplate(basketTemplate), events);
const orderForm = new OrderForm(cloneTemplate(orderTemplate), events);
const contactsForm = new ContactsForm(cloneTemplate(contactsTemplate), events);
const successView = new Success(cloneTemplate(successTemplate), events);

// ========================================
// ПРЕЗЕНТЕР - Бизнес-логика (обработчики событий)
// ========================================

// ----------------------------------------
// События моделей данных
// ----------------------------------------

/**
 * Обработка изменения каталога товаров
 * Создает карточки для всех товаров и отображает их в галерее
 */
events.on('catalog:changed', () => {
    const products = productsModel.getProducts();
    page.gallery = products.map(item => {
        const card = new CatalogCard(cloneTemplate(cardCatalogTemplate), events);
        return card.render({
            ...item,
            image: CDN_URL + item.image
        });
    });
});

/**
 * Обработка изменения товара для предпросмотра
 * Открывает модальное окно с детальной информацией о товаре
 */
events.on('preview:changed', (item: IProduct) => {
    const card = new PreviewCard(cloneTemplate(cardPreviewTemplate), events);
    const inBasket = basketModel.inBasket(item.id);

    modal.render({
        content: card.render({
            ...item,
            image: CDN_URL + item.image
        })
    });

    // Обновляем текст кнопки и состояние в зависимости от того, есть ли товар в корзине
    const button = card.render().querySelector('.card__button') as HTMLButtonElement;
    if (button) {
        if (inBasket) {
            button.textContent = 'Уже в корзине';
            button.disabled = true;
        } else if (item.price === null) {
            button.textContent = 'Не продается';
            button.disabled = true;
        }
    }
});

/**
 * Обработка изменения содержимого корзины
 * Обновляет счетчик, список товаров и общую стоимость
 */
events.on('basket:changed', () => {
    // Обновляем счетчик товаров в шапке
    page.counter = basketModel.getTotalItems();

    // Обновляем список товаров в корзине
    basketView.items = basketModel.getItems().map((item, index) => {
        const card = new BasketCard(cloneTemplate(cardBasketTemplate), events);
        return card.render({
            ...item,
            index: index + 1
        });
    });

    // Обновляем общую стоимость
    basketView.total = basketModel.getTotalPrice();
});

/**
 * Обработка изменения данных покупателя
 * Запускает валидацию и обновляет состояние форм
 */
events.on('buyer:changed', () => {
    const validation = buyerModel.validate();

    // Определяем, какие поля заполнены для каждой формы
    const buyerData = buyerModel.getData();
    const orderValid = Boolean(buyerData.payment && buyerData.address);
    const contactsValid = Boolean(buyerData.email && buyerData.phone);

    // Обновляем состояние формы заказа
    orderForm.valid = orderValid;
    if (!orderValid && (validation.payment || validation.address)) {
        orderForm.errors = [validation.payment, validation.address].filter(Boolean).join('; ');
    } else {
        orderForm.errors = '';
    }

    // Обновляем состояние формы контактов
    contactsForm.valid = contactsValid;
    if (!contactsValid && (validation.email || validation.phone)) {
        contactsForm.errors = [validation.email, validation.phone].filter(Boolean).join('; ');
    } else {
        contactsForm.errors = '';
    }
});

// ----------------------------------------
// События представлений
// ----------------------------------------

/**
 * Обработка выбора карточки товара для просмотра
 * Устанавливает товар для предпросмотра в модели
 */
events.on('card:select', (data: { id: string }) => {
    const product = productsModel.getProduct(data.id);
    if (product) {
        productsModel.setPreview(product);
    }
});

/**
 * Обработка добавления товара в корзину
 * Добавляет товар и закрывает модальное окно
 */
events.on('card:add', (data: { id: string }) => {
    const product = productsModel.getProduct(data.id);
    if (product) {
        basketModel.addItem(product);
        modal.close();
    }
});

/**
 * Обработка удаления товара из корзины
 * Удаляет товар из модели корзины
 */
events.on('card:remove', (data: { id: string }) => {
    const product = productsModel.getProduct(data.id);
    if (product) {
        basketModel.removeItem(product);
    }
});

/**
 * Обработка открытия корзины
 * Отображает модальное окно с содержимым корзины
 */
events.on('basket:open', () => {
    modal.render({
        content: basketView.render()
    });
});

/**
 * Обработка начала оформления заказа
 * Очищает данные покупателя и открывает форму заказа
 */
events.on('order:start', () => {
    buyerModel.clear();
    modal.render({
        content: orderForm.render()
    });
});

/**
 * Обработка отправки формы
 * Различное поведение для формы заказа и формы контактов
 */
events.on('form:submit', () => {
    const buyerData = buyerModel.getData();

    // Проверяем, какая форма отправляется по наличию данных
    if (buyerData.payment && buyerData.address && !buyerData.email && !buyerData.phone) {
        // Это форма заказа - переходим к форме контактов
        modal.render({
            content: contactsForm.render()
        });
    } else if (buyerData.email && buyerData.phone) {
        // Это форма контактов - отправляем заказ
        const order: IOrder = {
            ...buyerData,
            items: basketModel.getItems().map(item => item.id),
            total: basketModel.getTotalPrice()
        };

        larekApi.createOrder(order)
            .then(result => {
                basketModel.clear();
                buyerModel.clear();
                successView.total = result.total;
                modal.render({
                    content: successView.render()
                });
            })
            .catch(err => {
                console.error('Ошибка при оформлении заказа:', err);
            });
    }
});

/**
 * Обработка изменения полей ввода в формах
 * Сохраняет данные в модель покупателя
 */
events.on('input:change', (data: { field: string, value: string }) => {
    buyerModel.setData({ [data.field]: data.value });
});

/**
 * Обработка открытия модального окна
 * Блокирует прокрутку страницы
 */
events.on('modal:open', () => {
    page.locked = true;
});

/**
 * Обработка закрытия модального окна
 * Разблокирует прокрутку страницы
 */
events.on('modal:close', () => {
    page.locked = false;
});

/**
 * Обработка закрытия окна успешного заказа
 * Закрывает модальное окно и возвращает к каталогу
 */
events.on('success:close', () => {
    modal.close();
});

// ========================================
// Инициализация приложения
// ========================================

/**
 * Загрузка каталога товаров с сервера
 * После загрузки модель автоматически эмитит событие catalog:changed
 */
larekApi.getProducts()
    .then(items => {
        productsModel.setCatalog(items);
    })
    .catch(err => {
        console.error('Ошибка при загрузке товаров:', err);
    });
