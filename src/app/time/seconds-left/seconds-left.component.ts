import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { TimeHelper } from '../timeHelper';

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
    //
  }

  ngOnInit() {
    //
  }

  ngOnChanges(ch: SimpleChanges): void {

    if (ch['until'].currentValue) {

      let left = Math.max(0, TimeHelper.calculateSecondsUntil(ch['until'].currentValue))  ;

      if (this.intervalSubscription) {
        this.intervalSubscription.unsubscribe();
      }

      this.intervalSubscription = Observable.interval(100)
        .startWith(Math.floor(left))
        .take(Math.floor(left * 10))
        .subscribe(() => {
          left = TimeHelper.calculateSecondsUntil(ch['until'].currentValue);
          this.secondsLeft = Math.max(0, Math.floor(left));
        });
    }
  }


}
