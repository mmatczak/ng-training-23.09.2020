import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainHeaderComponent} from './main-header/main-header.component';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import { BusyIndicatorComponent } from './busy-indicator/busy-indicator.component';
import {BusyIndicatorService} from './busy-indicator/busy-indicator.service';

@NgModule({
  declarations: [MainHeaderComponent, BusyIndicatorComponent],
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
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [BusyIndicatorService]
    };
  }
}
