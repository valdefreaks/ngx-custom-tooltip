import { Component } from '@angular/core';
import { NgxCustomTooltipComponent } from 'ngx-custom-tooltip';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [NgxCustomTooltipComponent],
})
export class AppComponent {
  title = 'demo-app-standalone';
  show = false;
}
