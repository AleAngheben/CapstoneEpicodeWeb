import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Cart } from 'src/app/interfaces/cart';
import { Item } from 'src/app/interfaces/item';
import { User } from 'src/app/interfaces/user';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  productsOnCart: Item[] | undefined = [];
  user: User | undefined;
  cart: Cart | undefined;

  constructor(private cartSrv: CartService, private authSrv: AuthService) {}

  ngOnInit(): void {
    this.getUserProfile();
    this.loadMyCart();
  }

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
    });
  }
}
