import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Card } from 'src/app/data/common/schemas/card';
import { Item, ItemsService } from 'src/app/data/webapp-client';
import { CardsService } from 'src/app/data/common/services/cards.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit, OnDestroy {

  private _cards$: Observable<Array<Card>>;
  private _items$: Observable<Array<Item>>;
  private _destroy$: Subject<boolean> = new Subject();
  displayedColumns: string[] = ['no', 'name', 'tag'];

  constructor(
    private readonly cardsService: CardsService,
    private readonly itemsService: ItemsService) {
    this._cards$ = cardsService.fetch().pipe(
      takeUntil(this._destroy$)
    );
    this._items$ = itemsService.listItems().pipe(
      takeUntil(this._destroy$)
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  get cards$() {
    return this._cards$;
  }

  get items$() {
    return this._items$;
  }

}
