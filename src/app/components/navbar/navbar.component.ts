import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthData } from 'src/app/auth/auth-data';
import { AuthService } from 'src/app/auth/auth.service';
import { HomeService } from 'src/app/services/home.service';
import { BackofficeComponent } from '../backoffice/backoffice.component';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user!: AuthData | null;

  constructor(
    private authSrv: AuthService,
    private dialog: MatDialog,
    private HomeService: HomeService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.authSrv.user$.subscribe((user) => {
      this.user = user;
      console.log(this.user);
    });
  }

  logout() {
    this.authSrv.logout();
  }
  openBackoffice() {
    const dialogRef = this.dialog.open(BackofficeComponent);

    // dialogRef.afterClosed().subscribe(() => {
    //   this.getUserProfile();
    //   this.getProducts();
    // });
  }
  // getProducts() {
  //   this.HomeService.getProducts().subscribe((response: any) => {
  //     this.products = response.content;
  //   });
  // }
}
