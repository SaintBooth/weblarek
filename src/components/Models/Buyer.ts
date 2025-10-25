import { IBuyer, TPayment } from "../../types";

export class Buyer {
  protected payment: TPayment | null;
  protected address: string;
  protected email: string;
  protected phone: string;

  constructor() {
    this.payment = null;
    this.address = "";
    this.email = "";
    this.phone = "";
  }

  setData(data: Partial<IBuyer>): void {
    Object.assign(this, data);
  }

  getData(): IBuyer {
    return {
      payment: this.payment,
      address: this.address,
      email: this.email,
      phone: this.phone,
    };
  }

  clear(): void {
    this.payment = null;
    this.address = "";
    this.email = "";
    this.phone = "";
  }

  validate(): { [key: string]: string } {
    const errors: { [key: string]: string } = {};
    if (!this.payment) {
      errors.payment = "Не выбран вид оплаты";
    }
    if (!this.address) {
      errors.address = "Укажите адрес";
    }
    if (!this.email) {
      errors.email = "Укажите email";
    }
    if (!this.phone) {
      errors.phone = "Укажите телефон";
    }
    return errors;
  }
}
