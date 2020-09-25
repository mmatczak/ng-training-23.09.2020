import { Component, OnInit } from '@angular/core';
import {BusyIndicatorService} from './busy-indicator.service';

@Component({
  selector: 'app-busy-indicator',
  templateUrl: './busy-indicator.component.html',
  styleUrls: ['./busy-indicator.component.scss']
})
export class BusyIndicatorComponent {

  constructor(public readonly busyIndicator: BusyIndicatorService) {
  }
}
