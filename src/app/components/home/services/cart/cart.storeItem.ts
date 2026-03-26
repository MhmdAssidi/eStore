import { computed, signal } from "@angular/core";
import { CartItem } from "../../types/cart.type";
import { Product } from "../../types/products.type";

export class cartStoreItem {
    private readonly _products=signal<CartItem[]>([]);

    readonly totalAmount=computed(()=>{  //total cost of all products in the cart
    return this._products().reduce((sum,item)=>sum+item.amount,0);
    });

    readonly totalProducts=computed(()=>{ //total quantity of products in the cart
    return this._products().reduce((count,item)=>count+item.quantity,0);
    });

    readonly cart=computed(()=>({ //acts as a getter for the entire cart state, including products, total amount, and total products.
        products:this._products(), //list products in the cart
        totalAmount:this.totalAmount(), //total cost of all products in the cart
        totalProducts:this.totalProducts() //total quantity of products in the cart
    }));

    //its reactive so any change to the cart like adding products or updating quantitities will automatically update the total amount and total products, ensuring that the cart state is always consistent and up-to-date.

    addProduct(product:Product){
        const currentItems=this._products();
        const existingIndex=currentItems.findIndex(
            (item)=>item.product.id===product.id
        );

        if(existingIndex===-1){
            this._products.set([
                ...currentItems,
                {
                    product,
                    quantity:1,
                    amount:Number(product.price)
                }
            ])
        } else{
            const updatedItems=[...currentItems];
            const existing=updatedItems[existingIndex];

            updatedItems[existingIndex]={
                ...existing,
                quantity:existing.quantity+1,
                amount:(existing.quantity+1)*Number(product.price)
            };
            this._products.set(updatedItems);
        }

//  User clicks "Add to Cart"
// → addProduct(product) is called
// → check if product exists
// → if not → add new item
// → if yes → increase quantity
// → update signal
// → totals recalculate automatically
// → UI updates
    }
}