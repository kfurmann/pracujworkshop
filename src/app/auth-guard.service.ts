import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private apiService: ApiService, private router: Router) {
  }

  public canActivate(): boolean {

    console.log('guard!');
    if (!this.apiService.token) {

      this.router.navigate(['/rejestracja']);
    }
    return !!this.apiService.token;
  }

}
