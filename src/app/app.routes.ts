import { Routes } from '@angular/router';
import { CounterComponent } from './pages/counter/counter.component';
import { DisplayComponent } from './pages/display/display.component';

export const routes: Routes = [
  {
    path: '',
    component: CounterComponent
  },
  {
    path: 'display',
    component: DisplayComponent
  }
];
