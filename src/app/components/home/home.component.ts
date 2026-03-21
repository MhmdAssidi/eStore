import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidenavigationComponent } from './sidenavigation/sidenavigation.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent,NavbarComponent,SidenavigationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
