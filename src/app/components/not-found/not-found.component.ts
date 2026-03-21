import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-not-found',
  imports: [CommonModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {
  currentPath: string;

  constructor(private router: Router) {
    this.currentPath = this.router.url;
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}


