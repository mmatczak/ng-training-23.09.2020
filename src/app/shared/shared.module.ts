import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainHeaderComponent} from './main-header/main-header.component';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [MainHeaderComponent],
  exports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MainHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
})
export class SharedModule {
}
