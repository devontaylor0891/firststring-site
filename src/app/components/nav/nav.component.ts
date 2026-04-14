import { Component, signal, HostListener } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  menuOpen = signal(false);

  constructor(private router: Router) {}

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  scrollToSignup(): void {
    this.closeMenu();
    const el = document.getElementById('early-access');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      sessionStorage.setItem('scrollToSignup', '1');
      this.router.navigate(['/']);
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenu();
  }
}
