import { Product } from "./product";

export class ShoppingCartItem{

    title : string;
    imageUrl : string;
    price : number;
    id : string; // Product Id
    quantity : number;

    constructor(init?: Partial<ShoppingCartItem>){
        Object.assign(this, init);
    }

    get totalPrice(){
        return this.price * this.quantity;
    }
}