import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { CartService } from '../services/cart.service';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';
import { CartItem } from '../interfaces/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = []; 
  totalPrice = 0;
  shippingCost = 10; 
  shippingAddress = '';

  constructor(private cartService: CartService, private orderService: OrderService, private userService: UserService, private productService : ProductService ) { }

  ngOnInit(): void {
    // get shipping address
    this.userService.getUserProfile().subscribe((data: any) => {
      this.shippingAddress = data.user.address;
    })

    // display cart items
    this.cartService.getCartItems().subscribe(
      (response: any) => {
        if (response && Array.isArray(response.cartItems)) {
          this.cartItems = response.cartItems;
          this.totalPrice = response.totalPrice;
        } else {
          this.cartItems = []; 
        }
      },
      (error) => {
        console.error('Failed to get cart items', error);
      }
    );
  }

  checkout(): void {
    const shippingAddress = '123 Main St, City';

    this.orderService.createOrder(shippingAddress).subscribe(
      (response: any) => {
        window.location.href = '/orders';
      },
      (error) => {
        console.error('Failed to create order', error);
      }
    );
  }

  increaseQuantity(item: CartItem): void {
    const cartItem = {
      productId: item.productId,
      quantity: 1
    }
    this.productService.addToCart(cartItem).subscribe(() => {
      window.location.reload();
    });
  }

  decreaseQuantity(item: CartItem): void {
    const cartItem = {
      productId: item.productId,
      quantity: -1
    }

    const newQuantity = item.quantity - 1;
    if (newQuantity === 0) {
      this.cartService.deleteCartItem(item.id).subscribe(() => {
        window.location.reload();
      });
    } else {
      this.productService.addToCart(cartItem).subscribe(() => {
        window.location.reload();
      });
    }
  }
}
