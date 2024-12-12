import { Component, AfterViewInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AutheService } from 'src/app/services/authe.service';
import { DataUserService } from 'src/app/services/data-user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent implements AfterViewInit {

  user!: User | null;
  nomProfil: string = '';

  constructor(private renderer: Renderer2, private authService: AutheService, private router: Router, private userService:DataUserService) {}

  ngAfterViewInit(): void {
    this.initializeSidebar();
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    } else {
      this.user = null; 
    }
    console.log('User:', this.user);
    this.getProfilName(this.user!.idProfil)
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
      localStorage.removeItem('user'); // Supprimer aussi l'utilisateur du localStorage
      window.location.href = 'http://localhost:4200/';
      // this.router.navigateByUrl('');
    });
  }
  getProfilName(idProfil: number): void {
    this.userService.getProfilById(idProfil).subscribe(profil => {
      this.nomProfil = profil.nomProfil;
    });
  }

}
