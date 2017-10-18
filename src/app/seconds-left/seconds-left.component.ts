import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/startWith';

@Component({
  selector: 'app-seconds-left',
  templateUrl: './seconds-left.component.html',
  styleUrls: ['./seconds-left.component.css']
})
export class SecondsLeftComponent implements OnInit, OnChanges {

  @Input() public readonly until: Date;

  public secondsLeft: number;

  private intervalSubscription: Subscription;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(ch: SimpleChanges): void {

    console.log(ch);
    if (ch['until'].currentValue) {

      let left = Math.floor((ch['until'].currentValue.getTime() - (new Date()).getTime()) / 1000  );

      console.log(left);

      if (this.intervalSubscription) {
        this.intervalSubscription.unsubscribe();
      }

      this.intervalSubscription = Observable.interval(100)
        .startWith(Math.round(left))
        .take(Math.round(left * 10))
        .subscribe(() => {
          left -= .1;
          this.secondsLeft = Math.round(left);
        });
    }
  }

}
