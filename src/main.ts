import "./scss/styles.scss";
import { Products } from "./components/Models/Products";
import { Basket } from "./components/Models/Basket";
import { Buyer } from "./components/Models/Buyer";
import { LarekAPI } from "./components/LarekAPI";
import { API_URL } from "./utils/constants";
import { Api } from "./components/base/Api";

// Инициализация моделей и API
const api = new Api(API_URL);
const larekApi = new LarekAPI(api);

const productsModel = new Products();
const basketModel = new Basket();
const buyerModel = new Buyer();

//  Тестирование моделей

// Тестирование класса Products и Basket (зависит от данных с сервера)
console.log("Тестирование моделей Products и Basket");
larekApi
  .getProducts()
  .then((items) => {
    // Products
    productsModel.setCatalog(items);
    console.log(
      "Товары, полученные с сервера и сохраненные в модели:",
      productsModel.getProducts()
    );

    const testProductId = items[0].id;
    console.log(
      `Получение товара по id (${testProductId}):`,
      productsModel.getProduct(testProductId)
    );

    const productToPreview = items[1];
    productsModel.setPreview(productToPreview);
    console.log(
      "Товар для подробного отображения:",
      productsModel.getPreview()
    );

    // Basket
    console.log("\n Начало тестирования модели Basket");
    const productToAdd1 = productsModel.getProduct(items[2].id);
    const productToAdd2 = productsModel.getProduct(items[3].id);

    if (productToAdd1) {
      basketModel.addItem(productToAdd1);
      console.log(`Добавлен товар "${productToAdd1.title}" в корзину.`);
    }
    if (productToAdd2) {
      basketModel.addItem(productToAdd2);
      console.log(`Добавлен товар "${productToAdd2.title}" в корзину.`);
    }

    console.log("Товары в корзине:", basketModel.getItems());
    console.log("Количество товаров в корзине:", basketModel.getTotalItems());
    console.log("Общая стоимость:", basketModel.getTotalPrice());
    if (productToAdd1) {
      console.log(
        `Товар с id ${productToAdd1.id} в корзине:`,
        basketModel.inBasket(productToAdd1.id)
      );
      basketModel.removeItem(productToAdd1);
      console.log(`Удален товар "${productToAdd1.title}" из корзины.`);
    }
    console.log("Товары в корзине после удаления:", basketModel.getItems());

    basketModel.clear();
    console.log("Корзина после очистки:", basketModel.getItems());
    console.log("Тестирование моделей Products и Basket завершено");
  })
  .catch((err) => {
    console.error("Ошибка при получении товаров:", err);
  });

// Тестирование класса Buyer
console.log("\n Тестирование модели Buyer");
console.log("Начальные данные покупателя:", buyerModel.getData());
console.log("Результат валидации начальных данных:", buyerModel.validate());

buyerModel.setData({ email: "user@example.com", phone: "+79998887766" });
console.log("Данные после частичного обновления:", buyerModel.getData());
console.log(
  "Результат валидации после частичного обновления:",
  buyerModel.validate()
);

buyerModel.setData({
  payment: "card",
  address: "г. Москва, ул. Ленина, д. 1",
});
console.log("Данные после полного обновления:", buyerModel.getData());
console.log(
  "Результат валидации после полного обновления:",
  buyerModel.validate()
);

buyerModel.clear();
console.log("Данные после очистки:", buyerModel.getData());
console.log("Тестирование модели Buyer завершено");
