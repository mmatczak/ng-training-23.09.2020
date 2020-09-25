import { Component } from '@angular/core';
import {Event, ResolveEnd, ResolveStart, Router} from '@angular/router';
import {filter, map} from 'rxjs/operators';
import {BusyIndicatorService} from './shared/busy-indicator/busy-indicator.service';
import {OperatorFunction} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(router: Router, busy: BusyIndicatorService) {
    router.events
      .pipe(
        onlyResolveEvents(),
        map(event => event instanceof ResolveStart)
      )
      .subscribe(on => on ? busy.on() : busy.off());
  }
}

function onlyResolveEvents(): OperatorFunction<Event, Event> {
  return filter(event => event instanceof ResolveStart
    || event instanceof ResolveEnd);
}
