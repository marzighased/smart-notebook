import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  darkMode = signal<boolean>(false);
  
  toggleTheme() {
    this.darkMode.update(current => !current);
    document.body.classList.toggle('dark-theme', this.darkMode());
  }
}
