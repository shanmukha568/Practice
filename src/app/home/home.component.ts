import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, map, Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  intervalSubcription : any = Subscription;
  constructor() { }
 
  ngOnInit(): void {
    // this.intervalSubcription = interval(1000).subscribe(count => {
    //   console.log(count);
    // })


    // Custom observable

    let customobservale = Observable.create((observer:any) => {
      let count = 0;
      setInterval(() => {
        observer.next(count)
        count++;
      }, 1000)
    })

    this.intervalSubcription = customobservale.pipe(
      map((data: number) =>{
      return 'count is  ' + (data + 1);
    })).subscribe((data:any) =>{
      console.log(data);
    })

  }





  ngOnDestroy(): void {
    this.intervalSubcription.unsubscribe();
  }

}
function subscribe(arg0: (data: any) => void) {
  throw new Error('Function not implemented.');
}

