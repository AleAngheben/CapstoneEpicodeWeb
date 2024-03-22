import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import {
  NewProduct,
  Product,
  ProductModify,
} from 'src/app/interfaces/new-product';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
@Component({
  selector: 'app-product-office',
  templateUrl: './product-office.component.html',
  styleUrls: ['./product-office.component.scss'],
})
export class ProductOfficeComponent implements OnInit {
  product: Product | undefined;
  productId: string | undefined;
  productDataForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private prodSrv: ProductService,
    private authSrv: AuthService,
    public dialog: MatDialog,
    private snackBar: SnackBarComponent,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  productDataModify: ProductModify = {
    name: '',
    description: '',
    price: 0,
    type: '',
  };

  ngOnInit(): void {
    if (this.data.id) {
      this.productId = this.data.id;
      this.getProductDetails();
      this.productDataForm = this.fb.group({
        name: ['', Validators.required],
        description: [''],
        price: [0, Validators.min(0)],
        type: [''],
      });
    }
  }

  getProductDetails(): void {
    const productId = this.productId;
    if (productId) {
      this.prodSrv.getProductById(productId).subscribe((data) => {
        this.product = data;
        if (this.product) {
          this.productDataForm.patchValue({
            name: this.product.name,
            description: this.product.description,
            price: this.product.price,
            type: this.product.type,
            productImg: this.product.productImg,
          });
        }
      });
    }
  }
  updateProduct() {
    if (this.productDataForm.valid && this.productId) {
      const modifiedProduct = this.productDataForm.value;
      this.prodSrv
        .updateProduct(this.productId, modifiedProduct)
        .subscribe(() => {
          this.dialog.closeAll();
          this.snackBar.successSnackbar('Prodotto aggiornato con successo');
        });
    }
  }
}
