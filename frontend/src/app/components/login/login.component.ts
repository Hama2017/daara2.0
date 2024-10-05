import { Component } from '@angular/core';
import { AutheService } from 'src/app/services/authe.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2'; // Import de SweetAlert
import { Router } from '@angular/router'; // Import de Router pour la redirection

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  constructor(private authService: AutheService, private router: Router) {} // Injecter le Router

  onLogin(form: NgForm) {
    if (form.valid) {
      const credentials = form.value;
      this.authService.login(credentials).subscribe({
        next: (response) => {
          console.log('User logged in successfully', response);
          localStorage.setItem('token', response.token); // Stocker le token

        
            this.router.navigate(['/admin']);
         
        },
        error: (error) => {
          console.error('Login error', error);

          // SweetAlert pour l'échec de la connexion
          Swal.fire({
            title: 'Erreur!',
            text: 'Échec de la connexion, veuillez réessayer',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      });
    }
  }
}
