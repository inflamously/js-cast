import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-dropdown',
  templateUrl: './header-dropdown.component.html',
  styleUrls: ['./header-dropdown.component.scss'],
})
export class HeaderDropdownComponent implements OnInit {
  @Input() label = '–';
  @Input() hover = true;
  @Input() container = true;

  classes = undefined;

  ngOnInit(): void {
    this.classes = {
      'navbar-dropdown': this.container,
    };
  }
}
