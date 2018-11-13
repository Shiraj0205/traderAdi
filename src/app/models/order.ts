import { ShoppingCart } from "./shopping-cart";
import { UUID } from 'angular2-uuid';

export class Order{
    orderId : string;
    datePlaced : number;
    items : any[];

    constructor(public userId : string, 
        public shipping : any,
        shoppingCart : ShoppingCart ){
        
            this.orderId = UUID.UUID();
            this.datePlaced = new Date().getTime();
            this.items = shoppingCart.items.map(i => {
                return {
                product : {
                    title : i.title,
                    imageUrl : i.imageUrl,
                    price : i.price
                },
                quantity : i.quantity,
                totalPrice : i.totalPrice
                }
            });
    }
}