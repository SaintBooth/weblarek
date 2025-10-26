/**
 * Типы HTTP методов для POST запросов
 */
export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

/**
 * Интерфейс для работы с API
 */
export interface IApi {
    /** Выполнить GET запрос */
    get<T extends object>(uri: string): Promise<T>;
    /** Выполнить POST/PUT/DELETE запрос */
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

/**
 * Интерфейс товара
 */
export interface IProduct {
    /** Уникальный идентификатор товара */
    id: string;
    /** Описание товара */
    description: string;
    /** Путь к изображению товара */
    image: string;
    /** Название товара */
    title: string;
    /** Категория товара (софт-скил, хард-скил и т.д.) */
    category: string;
    /** Цена товара в синапсах, null если товар бесценен */
    price: number | null;
}

/**
 * Тип способа оплаты
 */
export type TPayment = 'card' | 'cash';

/**
 * Интерфейс данных покупателя
 */
export interface IBuyer {
    /** Способ оплаты: 'card' - онлайн, 'cash' - при получении */
    payment: TPayment | null;
    /** Email покупателя */
    email: string;
    /** Телефон покупателя */
    phone: string;
    /** Адрес доставки */
    address: string;
}

/**
 * Интерфейс заказа, расширяет данные покупателя
 */
export interface IOrder extends IBuyer {
    /** Общая стоимость заказа в синапсах */
    total: number;
    /** Массив ID товаров в заказе */
    items: string[];
}

/**
 * Интерфейс результата создания заказа от сервера
 */
export interface IOrderResult {
    /** ID созданного заказа */
    id: string;
    /** Списанная сумма в синапсах */
    total: number;
}

/**
 * Интерфейс данных главной страницы
 */
export interface IPage {
    /** Количество товаров в корзине для отображения в счетчике */
    counter: number;
    /** Массив DOM элементов карточек товаров для галереи */
    gallery: HTMLElement[];
    /** Флаг блокировки прокрутки страницы (при открытом модальном окне) */
    locked: boolean;
}

/**
 * Интерфейс данных модального окна
 */
export interface IModalData {
    /** DOM элемент с контентом для отображения в модальном окне */
    content: HTMLElement;
}

/**
 * Интерфейс карточки товара для отображения
 * Расширяет IProduct добавляя порядковый номер
 */
export interface ICard extends IProduct {
    /** Порядковый номер товара в корзине (опционально) */
    index?: number;
}

/**
 * Интерфейс представления корзины
 */
export interface IBasketView {
    /** Массив DOM элементов карточек товаров в корзине */
    items: HTMLElement[];
    /** Общая стоимость всех товаров в корзине в синапсах */
    total: number;
}

/**
 * Интерфейс окна успешного оформления заказа
 */
export interface ISuccess {
    /** Списанная сумма в синапсах */
    total: number;
}

/**
 * Интерфейс состояния формы
 */
export interface IFormState {
    /** Флаг валидности формы (true - форма валидна, можно отправлять) */
    valid: boolean;
    /** Массив текстов ошибок валидации */
    errors: string[];
}

/**
 * Интерфейс данных форм заказа
 */
export interface IOrderForm {
    /** Способ оплаты */
    payment: TPayment;
    /** Адрес доставки */
    address: string;
    /** Email покупателя */
    email: string;
    /** Телефон покупателя */
    phone: string;
}