import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Basket {
    protected items: IProduct[];

    constructor(protected events: IEvents) {
        this.items = [];
    }

    getItems(): IProduct[] {
        return this.items;
    }

    addItem(item: IProduct): void {
        this.items.push(item);
        this.events.emit('basket:changed');
    }

    removeItem(item: IProduct): void {
        this.items = this.items.filter(i => i.id !== item.id);
        this.events.emit('basket:changed');
    }

    clear(): void {
        this.items = [];
        this.events.emit('basket:changed');
    }

    getTotalPrice(): number {
        return this.items.reduce((sum, item) => sum + (item.price || 0), 0);
    }

    getTotalItems(): number {
        return this.items.length;
    }

    inBasket(id: string): boolean {
        return this.items.some(item => item.id === id);
    }
}
