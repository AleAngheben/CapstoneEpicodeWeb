import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Product } from 'src/app/interfaces/new-product';
import { User } from 'src/app/interfaces/user';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User | undefined;
  products: Product[] | undefined = [];
  constructor(private authSrv: AuthService) {}

  ngOnInit(): void {
    this.getUserProfile();
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

  // getMyProductsOnSell(): void {
  //   if (this.user) {
  //     this.products = this.user.productsOnSell;
  //     console.log(this.products);
  //   }
  // }
}
