import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { CartService } from 'src/app/services/cart.service';
import { Cart, CartItem } from '../../models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: [],
})
export class CartComponent implements OnInit {
  cart: Cart = {
    items: [],
  };

  displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ];
  dataSource: Array<CartItem> = [];

  constructor(private cartService: CartService, private http: HttpClient) {}

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart: Cart) => (this.cart = _cart));
    this.dataSource = this.cart.items;
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  onRemoveFromCart(item: CartItem): void {
    this.dataSource = this.cartService.removeFromCart(item);
  }

  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
  }

  onRemoveQuantity(item: CartItem): void {
    this.cartService.removeQuantity(item);
  }

  onCheckout(): void {
    this.http
      .post('http://localhost:4242/checkout', { items: this.cart.items })
      .subscribe(async (result: any) => {
        let stripe = await loadStripe(
          'pk_test_51MTqjTEL55EW6l6S9VTphnwASbpW8g4egRqDwLWNAM4qxz7JinEnvONxdwiDMjUbByeLClb6TybSJg7aQ8RHI3tD00yPffIJbP'
        );
        stripe?.redirectToCheckout({
          sessionId: result.id
        })
      });
  }
}
