import { Injectable } from '@angular/core';
import { cartStoreItem } from '../cart/cart.storeItem';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../user/services/user.service';
import { DeliveryAddress } from '../../types/cart.type';
import { Observable } from 'rxjs';
import { Order, OrderItem } from '../../types/order.type';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient,private cartStore:cartStoreItem,private userService: UserService) {

   }

   saveOrder(deliveryAddress:DeliveryAddress,userEmail:string):Observable<any>{
    const url='http://localhost:5001/orders/add';
    const orderDetails:OrderItem[]=[];
    this.cartStore.cart().products.forEach(product=>{
     const orderItem:OrderItem={ //convert each product in the cart to an order item format to add it to the array of order details
      productId:product.product.id,
      price:product.product.price,
      qty:product.quantity,
      amount:product.amount,
     };
      orderDetails.push(orderItem); //push each order item to the order details array
   });
  const order:Order={
    userName:deliveryAddress.userName,
    address:deliveryAddress.address,
    city:deliveryAddress.city,
    state:deliveryAddress.state,
    pin:deliveryAddress.pin,
    total:this.cartStore.totalAmount(), //calculate the total amount of the order
    userEmail:userEmail,
    orderDetails:orderDetails
  };
    return this.http.post(url,order,{
      headers:{
        Authorization: this.userService.token
      }
    });
  }


}
