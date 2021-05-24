import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StorageViewComponent } from './storage/storage-view/storage-view.component';

const routes: Routes = [
  {
    path: 'storage',
    component: StorageViewComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
