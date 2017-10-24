import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  public gameTitle = 'Państwa - miasta';

  constructor(public apiService: ApiService, private router: Router) {
    //
  }

  ngOnInit() {

    if (this.apiService.token) {

      this.router.navigate(['/gra']);
    }
  }

  public signIn(credentials: { name, password }) {

    this.apiService.signIn(credentials.name, credentials.password)
      .subscribe(() => {

        this.apiService.playerRegistered = true;

        this.router.navigate(['/gra']);
      });
  }

}
