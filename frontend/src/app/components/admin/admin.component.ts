import { Component, AfterViewInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AutheService } from 'src/app/services/authe.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})

export class AdminComponent implements AfterViewInit {

  userId: string | null = '';
  constructor(private renderer: Renderer2,private authService: AutheService,private router: Router) {}

  ngAfterViewInit(): void {
    console.log('AdminComponent View Initialized');
    this.initializeSidebar();
    this.userId = localStorage.getItem('userId');
    console.log('User ID:', this.userId);
  }

  initializeSidebar(): void {
    console.log('Initializing Sidebar');
    const elements = document.querySelectorAll('[data-bs-toggle="slide"]');
    elements.forEach(element => {
      console.log('Element found:', element);
      this.renderer.listen(element, 'click', () => {
        console.log('Element clicked:', element);
        const parent = element.closest('.slide');
        if (parent) {
          console.log('Parent element:', parent);
          const expandedSlides = document.querySelectorAll('.app-sidebar .slide.is-expanded');
          expandedSlides.forEach(expandedSlide => {
            if (expandedSlide !== parent) {
              expandedSlide.classList.remove('is-expanded');
            }
          });
          parent.classList.toggle('is-expanded');
          console.log('Parent class toggled');
        }
      });
    });
  }
  logout() {
    this.authService.logout().subscribe(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      this.router.navigateByUrl('');
    });
  }
}
