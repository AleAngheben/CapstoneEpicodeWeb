import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { NewProduct, Product } from 'src/app/interfaces/new-product';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.scss'],
})
export class BackofficeComponent implements OnInit {
  file: File = new File([''], '');
  selectedImageURL: string | null = null;

  constructor(
    private fb: FormBuilder,
    private prodSrv: ProductService,
    private authSrv: AuthService,
    public dialog: MatDialog
  ) {}

  productData: NewProduct = {
    name: '',
    description: '',
    price: 0,
    type: '',
    productImg: '',
  };

  ngOnInit(): void {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.file = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImageURL = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  createProduct() {
    this.authSrv.getMyProfile().subscribe(
      (user: User) => {
        const userId = user.id;
        const productDataMy = { ...this.productData, sellerId: userId };
        this.prodSrv.addProduct(productDataMy).subscribe(
          (response) => {
            console.log('Prodotto creato con successo');
            if (response.id) {
              this.uploadAvatar(this.file, response.id);
              alert('Prodotto aggiunto con successo');
              this.dialog.closeAll();
            }
          },
          (error) => {
            console.log('Errore durante la creazione del prodotto', error);
          }
        );
      },
      (error) => {
        console.log('Errore nel recupero del profilo utente', error);
      }
    );
  }

  uploadAvatar(file: File, id: string) {
    const formData = new FormData();
    formData.append('productImg', file);
    formData.append('id', id);

    this.prodSrv.uploadAvatar(formData).subscribe({
      next: (responseUrl: any) => {
        this.productData.productImg = responseUrl;
      },
      error: (err) => console.log('Error uploading avatar:', err),
    });
  }
}
