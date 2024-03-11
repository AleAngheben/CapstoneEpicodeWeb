import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductOnSell } from 'src/app/interfaces/new-product';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/auth/auth.service';
import { Cart } from 'src/app/interfaces/cart';
import { Item } from 'src/app/interfaces/item';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  productsOnCart: Item[] | undefined = [];
  user: User | undefined;
  cart: Cart | undefined;
  constructor(private cartSrv: CartService, private authSrv: AuthService) {}

  ngOnInit(): void {
    this.getUserProfile();
    this.loadMyCart();
  }

  loadMyCart(): void {
    this.cartSrv.getMyCart().subscribe(
      (products: Cart) => {
        this.cart = products;
        this.productsOnCart = products.items;
      },
      (error) => {
        console.error('Error loading cart:', error);
      }
    );
  }
  getUserProfile(): void {
    this.authSrv.getMyProfile().subscribe(
      (user: User) => {
        this.user = user;
        // this.getMyProductsOnSell();
      },
      (error) => {
        console.error('Errore nel recupero del profilo utente:', error);
      }
    );
  }

  removeItemFromCart(productId: string): void {
    this.cartSrv.deleteItemFromCart(productId);
  }
}
