import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {
  title = 'Stock Box';
}
