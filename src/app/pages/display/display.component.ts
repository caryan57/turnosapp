import { Component, computed, inject } from '@angular/core';
import { CounterService } from '../../services/counter.service';

@Component({
  templateUrl: './display.component.html',
  styleUrl: './display.component.css',
})
export class DisplayComponent {
  protected readonly counterService = inject(CounterService);
  protected readonly counter = computed(() => this.counterService.counter());
}
