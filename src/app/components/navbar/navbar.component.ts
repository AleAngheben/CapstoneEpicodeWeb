import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthData } from 'src/app/auth/auth-data';
import { AuthService } from 'src/app/auth/auth.service';
import { HomeService } from 'src/app/services/home.service';
import { BackofficeComponent } from '../backoffice/backoffice.component';
import { Cart } from 'src/app/interfaces/cart';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user!: AuthData | null;
  prodOnCart: number = 0;
  constructor(
    private authSrv: AuthService,
    private dialog: MatDialog,
    private HomeService: HomeService,
    private cartSrv: CartService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.authSrv.user$.subscribe((user) => {
      this.user = user;
      console.log(this.user);
      // this.getProds();
    });
  }

  logout() {
    this.authSrv.logout();
  }
  openBackoffice() {
    const dialogRef = this.dialog.open(BackofficeComponent);
  }

  // getProds() {
  //   this.cartSrv.getCartObservable().subscribe((cart: Cart) => {
  //     this.prodOnCart = cart.items.length;
  //   });
  // }
}
