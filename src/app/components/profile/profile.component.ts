import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Product, ProductOnSell } from 'src/app/interfaces/new-product';
import { User } from 'src/app/interfaces/user';
import { ProductService } from 'src/app/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogUserComponent } from '../dialog-user/dialog-user.component';
import { ProductOfficeComponent } from '../product-office/product-office.component';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User | undefined;
  products: ProductOnSell[] | undefined = [];
  file: File = new File([''], '');
  imageSwitch: boolean = true;
  avatar!: string;

  constructor(
    private authSrv: AuthService,
    private productService: ProductService,
    public dialog: MatDialog,
    private snackBar: SnackBarComponent
  ) {}

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

  openDialog() {
    const dialogRef = this.dialog.open(DialogUserComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.getUserProfile();
    });
  }

  editProduct(id: string): void {
    const dialogRef = this.dialog.open(ProductOfficeComponent, {
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadProductsOnSale();
    });
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

  deleteProduct(id: string) {
    const confirmDelete = confirm(
      'Sei sicuro di voler eliminare questo prodotto?'
    );
    this.productService.deleteProduct(id).subscribe(
      () => {
        this.loadProductsOnSale();
        this.snackBar.yellowSnackbar('Prodotto eliminato con successo');
      },
      (error) => {
        console.error("Errore durante l'eliminazione del prodotto:", error);
      }
    );
  }
}
