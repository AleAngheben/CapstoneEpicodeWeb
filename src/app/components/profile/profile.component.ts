import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Product, ProductOnSell } from 'src/app/interfaces/new-product';
import { User } from 'src/app/interfaces/user';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnChanges {
  user: User | undefined;
  products: ProductOnSell[] | undefined = [];
  file: File = new File([''], '');
  imageSwitch: boolean = true;
  avatar!: string;
  constructor(
    private authSrv: AuthService,
    private productService: ProductService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(): void {
    this.authSrv.getMyProfile().subscribe(
      (user: User) => {
        this.user = user;
        this.avatar = user.avatarUrl;
        this.loadProductsOnSale();
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

  //-----------------------------------------

  onFileSelected(event: any) {
    this.imageSwitch = false;
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);
      this.authSrv.uploadAvatar(formData).subscribe(
        (response) => {
          console.log('Avatar uploaded successfully:', response);
          if (response && response.avatarUrl) {
            if (this.user) {
              this.avatar = response.avatarUrl;
              this.imageSwitch = true;

              console.log('la response', response);
            }
          }
          this.getUserProfile();
        },
        (error) => {
          console.error('Failed to upload avatar:', error);
        }
      );
    }
  }

  onClickUploadButton() {
    const fileInput = document.getElementById('avatarInput');
    if (fileInput) {
      fileInput.click();
    }
  }
}
