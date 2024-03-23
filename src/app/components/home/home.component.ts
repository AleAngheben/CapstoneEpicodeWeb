import { Component, OnInit, HostListener } from '@angular/core';
//import { ProductResponse } from 'src/app/interfaces/new-product';
import { HomeService } from 'src/app/services/home.service';
import { Observable } from 'rxjs/internal/Observable';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/new-product';
import { AuthService } from 'src/app/auth/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { BackofficeComponent } from '../backoffice/backoffice.component';
import { ProductService } from 'src/app/services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
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
  user!: User;
  buyable: boolean = false;
  isAdmin: boolean = false;
  // searchQuery: string = '';
  // selectedCategory: string = '';
  name: string = '';
  type: string = '';
  showBackToTopBtn: boolean = false;
  productCategories: string[] = [
    'VIDEOGAMES',
    'BOOKS',
    'ELECTRONICS',
    'CLOTHING',
    'SPORT',
    'TOYS',
    'MUSIC',
    'FURNITURE',
    'PET_SUPPLIES',
    'OTHER',
  ];
  constructor(
    private HomeService: HomeService,
    private activatedRoute: ActivatedRoute,
    private authSrv: AuthService,
    private cartSrv: CartService,
    private userSrv: UserService,
    public dialog: MatDialog,
    private prodSrv: ProductService,
    private router: Router,

    private snackBar: SnackBarComponent
  ) {
    this.page = 0;
    this.size = 10;
    this.totalPages = 1;
  }

  ngOnInit(): void {
    this.getUserProfile();
    this.getProducts();
    console.log(this.user);
  }

  getProducts() {
    this.HomeService.getProducts().subscribe((response: any) => {
      this.products = response.content;
    });
  }
  addToCart(productId: string) {
    this.cartSrv.addItemToCart(productId).subscribe((response) => {
      console.log('Prodotto aggiunto al carrello', response);
      this.snackBar.successSnackbar('Prodotto aggiunto al carrello');
    });
  }
  getUserProfile(): void {
    this.authSrv.getMyProfile().subscribe((user: User) => {
      this.user = user;
      this.isAdminRole();
      console.log(this.user);
    });
  }

  isBuyable(userId: string, sellerId: string) {
    if (userId === sellerId) {
      this.buyable = false;
    } else {
      this.buyable = true;
    }
  }
  openBackoffice() {
    const dialogRef = this.dialog.open(BackofficeComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.getUserProfile();
      this.getProducts();
    });
  }
  deleteProduct(id: string) {
    const confirmDelete = confirm(
      'Sei sicuro di voler eliminare questo prodotto?'
    );
    this.prodSrv.deleteProduct(id).subscribe(() => {
      this.getProducts();
      this.snackBar.yellowSnackbar('Prodotto eliminato con successo');
    });
  }
  isAdminRole() {
    if (this.user && this.user.role && this.user.role === 'ADMIN') {
      this.isAdmin = true;
    }
  }
  onCardClick(id: string) {
    this.router.navigate([`/details/${id}`]);
  }

  clearSearch() {
    this.name = '';
    this.searchProductsOnChange();
  }

  searchProductsOnChange(): void {
    this.prodSrv
      .searchProducts(this.name, this.type)
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((products) => {
        this.products = products;
      });
  }

  setType(selectedType: string): void {
    if (selectedType !== 'all') {
      this.type = selectedType.toUpperCase();
      this.searchProductsOnChange();
    } else {
      this.type = '';
      this.searchProductsOnChange();
    }
  }

  //bottone che porta incima alla pagina
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showBackToTopBtn = window.scrollY > 200;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
