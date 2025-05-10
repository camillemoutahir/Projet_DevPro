import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrls: ['./navbar.component.scss'],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  constructor(private router: Router) {}

  goTo(path: string) {
    this.router.navigate([path]);
  }
}
