import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductOnSell } from 'src/app/interfaces/new-product';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/auth/auth.service';
import { Cart } from 'src/app/interfaces/cart';
import { Item } from 'src/app/interfaces/item';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  productsOnCart: Item[] | undefined = [];
  user: User | undefined;
  cart: Cart | undefined;
  constructor(
    private cartSrv: CartService,
    private authSrv: AuthService,
    private snackBar: SnackBarComponent
  ) {}

  ngOnInit(): void {
    this.getUserProfile();
    this.loadMyCart();
  }

  //ricava carrello dell user loggato
  loadMyCart(): void {
    this.cartSrv.getMyCart().subscribe((products: Cart) => {
      this.cart = products;
      this.productsOnCart = products.items;
    });
  }

  //ricava user loggato
  getUserProfile(): void {
    this.authSrv.getMyProfile().subscribe((user: User) => {
      this.user = user;
      // this.getMyProductsOnSell();
    });
  }

  //al click deleta completamente l'item ( dal carrello )
  removeItemFromCart(itemId: string): void {
    this.cartSrv.deleteItemFromCart(itemId).subscribe(() => {
      this.loadMyCart();
      this.snackBar.yellowSnackbar('Elemento eliminato');
    });
  }

  //aggiunge 1 alla quantità del prodotto incrementato
  increaseItemQuantity(itemId: string): void {
    this.cartSrv.itemPlusOnCart(itemId).subscribe(() => {
      this.loadMyCart();
      this.snackBar.successSnackbar('Quantità aumentata');
    });
  }

  //diminuisce di 1 la quantità fino ad eliminarlo completamente dal carrello
  decreaseItemQuantity(productId: string): void {
    this.cartSrv.itemMinusOnCart(productId).subscribe(() => {
      this.loadMyCart();
      this.snackBar.yellowSnackbar('Quantità diminuita');
    });
  }
}
