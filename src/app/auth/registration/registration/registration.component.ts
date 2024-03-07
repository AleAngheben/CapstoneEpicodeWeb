import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  subscribeForm!: FormGroup;
  confirmPass$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  constructor(private fb: FormBuilder, private authSrv: AuthService) {}

  // confirmPasswordCorrected() {
  //   this.confirmPass$.next(false);

  //   console.log(this.confirmPass$.getValue());
  //   if (
  //     this.subscribeForm.controls['password'].value ===
  //     this.subscribeForm.controls['confirmPassword'].value
  //   ) {
  //     this.subscribeForm.controls['confirmPassword'].setErrors(null);
  //     this.confirmPass$.next(true);
  //     console.log(this.confirmPass$.getValue());
  //   } else {
  //     this.subscribeForm.controls['confirmPassword'].setErrors({
  //       notEqual: true,
  //     });
  //     this.confirmPass$.next(false);
  //     console.log(this.confirmPass$.getValue());
  //   }
  // }

  ngOnInit(): void {
    this.subscribeForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      surname: [null, Validators.required],
      confirmPassword: [null, [Validators.required, Validators.minLength(8)]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      acceptTerms: [null, Validators.required],
    });
  }
  onRegister() {
    const data = {
      name: this.subscribeForm.controls['name'].value,
      surname: this.subscribeForm.controls['surname'].value,
      username: this.subscribeForm.controls['username'].value,
      email: this.subscribeForm.controls['email'].value,
      password: this.subscribeForm.controls['password'].value,
    };

    try {
      this.authSrv.register(data).subscribe();
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }
}
