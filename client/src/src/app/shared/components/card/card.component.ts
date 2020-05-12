import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() avatar_url: string;
  @Input() title: string;
  @Input() subtitle: string;
  @Input() image_url: string;
  @Input() alt: string;
  @Input() content: string;

  constructor() { }

  ngOnInit() {
  }

}
