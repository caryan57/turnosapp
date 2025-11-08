import { Component, computed, effect, inject, signal } from '@angular/core';
import { CounterService } from '../../services/counter.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
  imports: [CommonModule, FormsModule],
})
export class CounterComponent {
  protected readonly counterService = inject(CounterService);
  protected readonly counter = computed(() => this.counterService.counter());
  protected editing = signal(false);
  protected editValue = signal(0);
  protected errorMessage = signal('');

  private audio = new Audio('../../assets/sounds/notification.mp3');

  playNotification() {
    if (this.counterService.mute()) return;

    this.audio.load();
    this.audio.volume = 0.5;
    this.audio.play();
  }

  increment() {
    this.counterService.increment();
    this.playNotification();
  }

  decrement() {
    this.counterService.decrement();
  }

  reset() {
    this.counterService.reset();
  }

  openDisplay(): void {
    this.counterService.openDisplay();
  }

  print(): void {
    this.counterService.print();
  }

  startEdit() {
    this.editValue.set(this.counter());
    this.editing.set(true);
  }

  clearErrors() {
    if(this.errorMessage() !== '') {
      this.errorMessage.set('');
    }
  }

  confirmEdit() {
    this.editing.set(false);
    const value = Number(this.editValue());

    if(isNaN(value) || value < 0 || value > 99999) {
      this.errorMessage.set('Por favor, ingresa un numero entre 0 y 99999');
      return;
    }

    this.counterService.setCounter(value);
    this.clearErrors();
    this.playNotification();
  }
}
