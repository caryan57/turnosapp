import { effect, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CounterService {
  public counter = signal(this.loadCounterFromLocalStorage());
  public mute = signal(this.loadMuteFromLocalStorage());
  private channel = new BroadcastChannel('counter-channel');
  protected currentCounterValue = localStorage.getItem('currentCounterValue');
  protected currentMuteValue = localStorage.getItem('mute');

  protected showCounterToDisplay = effect(() => {
    this.channel.postMessage(this.counter());
    this.setCounterToLocalStorage(this.counter());
  });

  constructor() {
    this.channel.onmessage = (ev) => {
      this.counter.set(ev.data);
    };
  }

  public loadCounterFromLocalStorage() {
    const storedValue = localStorage.getItem('currentCounterValue');
    if (storedValue) {
      return Number(storedValue);
    } else {
      return 0;
    }
  }

  public setCounterToLocalStorage(value: number) {
    localStorage.setItem('currentCounterValue', value.toString());
  }

  public loadMuteFromLocalStorage() {
    const storedValue = localStorage.getItem('mute');
    if (storedValue) {
      return storedValue === 'true';
    } else {
      return false;
    }
  }

  public increment() {
    this.counter.update((v) => v + 1);
  }

  public decrement() {
    if (this.counter() === 0) return;
    this.counter.update((v) => v - 1);
  }

  public reset() {
    this.counter.set(0);
  }

  public setCounter(value: number) {
    this.counter.set(value); 
  }

  public openDisplay(): void {
    window.open(
      '/display', // Ruta donde estará la pantalla del número
      '_blank'
    );
  }
  
  public toggleMute() {
    const newValue = !this.mute();
    this.mute.set(newValue);
    localStorage.setItem('mute', newValue.toString());
  }
  
  public print() {
    const date = new Date().toLocaleString();
    const ticketContent = `
    <html>
      <head>
        <title>Ticket</title>
        <style>
          body {
            font-family: 'Courier New', monospace;
            width: 240px; /* 58mm */
            margin: 0;
            padding: 8px;
          }

          .center {
            text-align: center;
          }

          .logo {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 5px;
          }

          .divider {
            margin: 10px 0;
            border-top: 1px dashed #000;
          }

          .big-number {
            font-size: 48px;
            font-weight: bold;
            margin: 20px 0;
            text-align: center;
          }

          .footer {
            font-size: 12px;
            text-align: center;
            opacity: 0.8;
            margin-top: 10px;
          }
        </style>
      </head>
      <body>
        
        <div class="center logo">
          TurnosApp
        </div>

        <div class="center">
          Ticket de turno
        </div>

        <div class="divider"></div>

        <div class="big-number">
          ${this.counter()}
        </div>

        <div class="divider"></div>

        <div class="footer">
          Fecha: ${date}<br>
          Gracias por su visita
        </div>

      </body>
    </html>
  `;

    const printWindow = window.open('', '', 'width=1200,height=800');

    if (!printWindow) return;

    printWindow.document.open();
    printWindow.document.write(ticketContent);
    printWindow.document.close();

    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 350);
  }
}
