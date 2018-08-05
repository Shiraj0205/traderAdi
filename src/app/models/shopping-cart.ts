import { Product } from "./product";
import { ProductCardComponent } from "../product-card/product-card.component";
import { ShoppingCartItem } from "./shopping-cart-item";

export interface ShoppingCart{
    cartId : string,
    items : ShoppingCartItem[]
}