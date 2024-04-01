import { Component, OnInit } from '@angular/core';
import { AuthData } from 'src/app/auth/auth-data';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  user!: AuthData | null;
  constructor(private authSrv: AuthService) {}

  ngOnInit(): void {
    this.getUser();
  }
  getUser() {
    this.authSrv.user$.subscribe((user) => {
      this.user = user;
    });
  }
}
