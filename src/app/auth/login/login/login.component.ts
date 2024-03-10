import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  passwordVisible: boolean = false;

  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onLogin(form: NgForm) {
    console.log(form.value);
    const data = {
      email: form.value.email,
      password: form.value.password,
    };
    try {
      this.authSrv.login(data).subscribe();
      this.router.navigate(['/home']);
    } catch (error) {
      alert('Login errato');
      console.log(error);
      this.router.navigate(['/login']);
    }
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
}
