import { computed, effect, signal } from "@angular/core";
import { CartItem } from "../../types/cart.type";
import { Product } from "../../types/products.type";

export class cartStoreItem {
    private readonly _products=signal<CartItem[]>(this.loadFromSession());
    private _saveEffect=effect(() => {
        const products=this._products();
        if(products.length===0){
            sessionStorage.removeItem('cart');
        } else {
            sessionStorage.setItem('cart', JSON.stringify(products));
        }
    });
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


    }
decreaseProductQuantity(cartItem:CartItem){
    const updatedItems=this._products().map(item=>{
        if(item.product.id===cartItem.product.id){ //the product is in the cart
            if(item.quantity<=1){
                return null; //remove the item from the cart if quantity is 1 or less
            }
            const newQuantity=item.quantity-1;
            return{
                ...item,
                quantity:newQuantity,
                amount:item.amount-Number(item.product.price) //update the amount based on the new quantity
            }
        }
        return item;
    }).filter(Boolean) as CartItem[]; //remove null items from the array
    this._products.set(updatedItems);
}

removeProduct(cartItem: CartItem): void {
  //  Create a new array excluding the target item
  const updatedItems = this._products().filter(
    item => item.product.id !== cartItem.product.id);

  // Update the state signal with the new array
  this._products.set(updatedItems);
}

private loadFromSession():CartItem[]{
    const storedProducts=sessionStorage.getItem('cart');
    return storedProducts ? JSON.parse(storedProducts) : [];
}

clearCart(): void {
    sessionStorage.clear();
    this.cart().products=[];
    this.cart().totalAmount=0;
    this.cart().totalProducts=0;
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

