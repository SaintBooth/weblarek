import { IApi, IOrder, IOrderResult, IProduct } from "../types/index.ts";

export class LarekAPI {
  protected api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  async getProducts(): Promise<IProduct[]> {
    const result = await this.api.get<{ items: IProduct[] }>("/product");
    return result.items;
  }

  async createOrder(order: IOrder): Promise<IOrderResult> {
    const result = await this.api.post<IOrderResult>("/order", order);
    return result;
  }
}
