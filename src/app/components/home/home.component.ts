import { Component, OnInit } from '@angular/core';
//import { ProductResponse } from 'src/app/interfaces/new-product';
import { HomeService } from 'src/app/services/home.service';
import { Observable } from 'rxjs/internal/Observable';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/new-product';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  response!: any[];
  products: Product[] = [];
  admin = false;
  page!: number;
  size!: number;
  totalElements!: number;
  totalPages!: number;

  constructor(
    private HomeService: HomeService,
    private activatedRoute: ActivatedRoute
  ) {
    this.page = 0;
    this.size = 10;
    this.totalPages = 1;
  }

  ngOnInit(): void {
    this.getProducts();
  }

  //devo guardare qua cosa devo fare!
  getProducts() {
    this.HomeService.getProducts().subscribe((response: any) => {
      this.products = response.content;
    });
  }
}
