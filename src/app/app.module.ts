import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Route } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './auth/token.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './auth/auth.guard';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './auth/registration/registration/registration.component';
import { LoginComponent } from './auth/login/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CartComponent } from './components/cart/cart.component';
import { BackofficeComponent } from './components/backoffice/backoffice.component';
import { DialogUserComponent } from './components/dialog-user/dialog-user.component';
import { DialogProductComponent } from './components/dialog-product/dialog-product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductOfficeComponent } from './components/product-office/product-office.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';

//snackbar
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ErrorInterceptor } from './auth/error.interceptor';

import { SuccesscheckoutComponent } from './components/successcheckout/successcheckout.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
const routes: Route[] = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegistrationComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'postingProduct',
    component: BackofficeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'successpayment',
    component: SuccesscheckoutComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'details/:id',
    component: ProductDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'editProduct/:id',
    component: BackofficeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ProfileComponent,
    CartComponent,
    BackofficeComponent,
    DialogUserComponent,
    DialogProductComponent,
    ProductOfficeComponent,
    ProductDetailsComponent,
    SnackBarComponent,
    CheckoutComponent,
    SuccesscheckoutComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
    ProfileComponent,
    SnackBarComponent,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
