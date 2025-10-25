import { IProduct } from "../../types";

export class Products {
    protected products: IProduct[];
    protected preview: IProduct | null;

    constructor() {
        this.products = [];
        this.preview = null;
    }

    setCatalog(items: IProduct[]): void {
        this.products = items;
    }

    getProducts(): IProduct[] {
        return this.products;
    }

    getProduct(id: string): IProduct | undefined {
        return this.products.find(item => item.id === id);
    }

    setPreview(item: IProduct): void {
        this.preview = item;
    }

    getPreview(): IProduct | null {
        return this.preview;
    }
}
