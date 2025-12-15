import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'demo-app';
  show = false; // controla la visibilidad del tooltip
}
