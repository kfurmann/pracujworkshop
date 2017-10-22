import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ApiService } from './api.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private apiService: ApiService) {
  }

  public canActivate() {

    return !!this.apiService.token;
  }

}
