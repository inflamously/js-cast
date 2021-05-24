import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header-item',
  templateUrl: './header-item.component.html',
  styleUrls: ['./header-item.component.scss'],
})
export class HeaderItemComponent implements OnInit {
  @Input() link = true;
  @Input() container = false;
  @Output() click = new EventEmitter<any>();

  classes = {};

  constructor() {}

  ngOnInit(): void {
    this.classes = {
      'navbar-item': !this.container,
      'is-unselectable': true,
    };
  }

  emitClick(ev: Event): void {
    this.click.emit(ev);
  }
}
