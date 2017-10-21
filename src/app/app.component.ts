import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public playerRegistered = false;

  constructor(public apiService: ApiService) {
  }


  public signIn(credentials: { name, password }) {

    this.apiService.signIn(credentials.name, credentials.password)
      .subscribe(() => {

        this.playerRegistered = true;
        this.apiService.connect();
      });
  }

}
