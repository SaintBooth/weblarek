import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Products {
    protected products: IProduct[];
    protected preview: IProduct | null;

    constructor(protected events: IEvents) {
        this.products = [];
        this.preview = null;
    }

    setCatalog(items: IProduct[]): void {
        this.products = items;
        this.events.emit('catalog:changed');
    }

    getProducts(): IProduct[] {
        return this.products;
    }

    getProduct(id: string): IProduct | undefined {
        return this.products.find(item => item.id === id);
    }

    setPreview(item: IProduct): void {
        this.preview = item;
        this.events.emit('preview:changed', item);
    }

    getPreview(): IProduct | null {
        return this.preview;
    }
}
