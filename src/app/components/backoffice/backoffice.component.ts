import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.scss'],
})
export class BackofficeComponent implements OnInit {
  productForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private prodSrv: ProductService,
    private authSrv: AuthService
  ) {
    this.productForm = this.fb.group({
      name: [''],
      description: [''],
      price: [''],
      type: [''],
      productImg: [''],
    });
  }

  ngOnInit(): void {}

  createProduct(): void {
    if (this.productForm.valid) {
      const user = this.authSrv.getMyProfile().subscribe(
        (user: User) => {
          const userId = user.id;
          const productData = { ...this.productForm.value, sellerId: userId };
          this.prodSrv.addProduct(productData).subscribe((response) => {
            console.log('Prodotto creato con successo', response);

            alert('Prodotto creato e aggiunto alla home !');
            this.productForm.reset();
          });
        },
        (error) => {
          console.error('Errore nel recupero del profilo utente', error);
        }
      );
    } else {
    }
    console.log('Form non valido!');
  }
}
