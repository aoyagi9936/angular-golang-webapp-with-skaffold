import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Card } from '../schemas/card';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor() { }

  fetch(): Observable<Card[]> {
    return of(
      [
        new Card("assets/images/cow.jpg",
          "Title1",
          "Sub Title1",
          "assets/images/strawberry.jpg",
          "strawberry",
          "Content1"
        ),
        new Card("assets/images/wolf.jpg",
          "Title2",
          "Sub Title2",
          "assets/images/baking.jpg",
          "baking",
          "Content2"),
        new Card("assets/images/sheep.jpg",
          "Title3",
          "Sub Title3",
          "assets/images/drinks.jpg",
          "drinks",
          "Content3")
      ]
    )
  }
}
