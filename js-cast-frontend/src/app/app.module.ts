import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './interaction/button/button.component';
import { HeaderDividerComponent } from './interaction/header/header-divider/header-divider.component';
import { HeaderDropdownComponent } from './interaction/header/header-dropdown/header-dropdown.component';
import { HeaderItemComponent } from './interaction/header/header-item/header-item.component';
import { HeaderComponent } from './interaction/header/header.component';
import { StorageHeaderComponent } from './storage/storage-header/storage-header.component';
import { StorageViewComponent } from './storage/storage-view/storage-view.component';

@NgModule({
  declarations: [
    AppComponent,
    StorageViewComponent,
    ButtonComponent,
    HeaderComponent,
    HeaderDropdownComponent,
    HeaderItemComponent,
    HeaderDividerComponent,
    StorageHeaderComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
