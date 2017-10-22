import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  @Output() public onSignIn: EventEmitter<any> = new EventEmitter<any>();

  public password = '';

  constructor(public player: PlayerService) {
  }

  ngOnInit() {
  }

  public signIn(credentials: {name, password}) {

    this.onSignIn.emit(credentials);
  }

}
