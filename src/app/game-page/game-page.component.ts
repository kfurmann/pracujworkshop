import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {

  constructor(public apiService: ApiService) {
  }

  ngOnInit() {
    console.log('connect');
    this.apiService.connect();
  }

}
