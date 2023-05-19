import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Trabajo autonomo';
  sideNavStatus: boolean= true;
  constructor(public authService: AuthService) {}
}
