import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SnackBarComponent } from 'src/app/components/snack-bar/snack-bar.component';

// declare var google: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  passwordVisible: boolean = false;

  constructor(
    private authSrv: AuthService,
    private router: Router,
    private snackBar: SnackBarComponent
  ) {}

  ngOnInit(): void {}

  onLogin(form: NgForm) {
    console.log(form.value);
    const data = {
      email: form.value.email,
      password: form.value.password,
    };

    this.authSrv.login(data).subscribe(() => {
      this.router.navigate(['/home']);
      this.snackBar.successSnackbar('Login effettuato');
    });
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
    const passwordInput = document.getElementById('inputPassword');
    if (passwordInput) {
      passwordInput.setAttribute(
        'type',
        this.passwordVisible ? 'text' : 'password'
      );
    }
  }

  //google
  // ngAfterViewInit(): void {
  //   google.accounts.id.initialize({
  //     client_id:
  //       '236025958894-l05tha7iovc0ool81upch4i6gi91npe8.apps.googleusercontent.com',
  //     callback: (response: any) => this.handleGoogleSignIn(response),
  //   });
  //   google.accounts.id.renderButton(
  //     document.getElementById('buttonDiv'),
  //     { size: 'large', type: 'icon', shape: 'pill' } // customization attributes
  //   );
  // }

  // handleGoogleSignIn(response: any) {
  //   console.log(response.credential);

  //   // This next is for decoding the idToken to an object if you want to see the details.
  //   let base64Url = response.credential.split('.')[1];
  //   let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  //   let jsonPayload = decodeURIComponent(
  //     atob(base64)
  //       .split('')
  //       .map(function (c) {
  //         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  //       })
  //       .join('')
  //   );
  //   console.log(JSON.parse(jsonPayload));
  // }
}
