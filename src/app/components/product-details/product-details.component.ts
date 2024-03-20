import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/new-product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;
  constructor(private prodSrv: ProductService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this.route.params.subscribe((params) => {
      const productId = params['id'];
      this.prodSrv.getProductById(productId).subscribe((product) => {
        this.product = product;
      });
    });
  }
}
