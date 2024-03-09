import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Product, ProductOnSell } from 'src/app/interfaces/new-product';
import { User } from 'src/app/interfaces/user';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User | undefined;
  products: ProductOnSell[] | undefined = [];
  constructor(
    private authSrv: AuthService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getUserProfile();
    this.loadProductsOnSale();
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
  loadProductsOnSale(): void {
    this.productService.getMyProductsOnSale().subscribe(
      (products: ProductOnSell[]) => {
        this.products = products;
      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );
  }
  // getMyProductsOnSell(): void {
  //   if (this.user) {
  //     this.products = this.user.productsOnSell;
  //     console.log(this.products);
  //   }
  // }
}
