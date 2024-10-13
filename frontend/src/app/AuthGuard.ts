import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    // Vérifiez si le token est présent dans le localStorage
    const token = localStorage.getItem('token');
    if (token) {
      return true; // Autorisé à accéder à la route
    } else {
      // Rediriger vers la page de login si non authentifié
      this.router.navigate(['']);
      return false;
    }
  }
}
