import { Component, OnInit } from '@angular/core';
import { AutheService } from 'src/app/services/authe.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2'; // Import de SweetAlert
import { Router } from '@angular/router'; // Import de Router pour la redirection
import { DataUserService } from 'src/app/services/data-user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  user!: User | null;
  nomProfil: string = '';
ngOnInit(): void {
  const storedUser = localStorage.getItem('user');
          if (storedUser) {
          this.user = JSON.parse(storedUser);
          } else {
            this.user = null; 
          }
          this.getProfilName(this.user!.idProfil);
          console.log(this.nomProfil);
}
  constructor(private authService: AutheService, private router: Router,private userService:DataUserService) {} // Injecter le Router
  getProfilName(idProfil: number): void {
    this.userService.getProfilById(idProfil).subscribe(profil => {
      this.nomProfil = profil.nomProfil;
    });
  }
  
  
  onLogin(form: NgForm) {
    if (form.valid) {
      const credentials = form.value;
      this.authService.login(credentials).subscribe({
        next: (response) => {
          console.log('User logged in successfully', response);
          localStorage.setItem('token', response.token); 
          if(this.nomProfil==='Admin'){
            this.router.navigate(['/admin']);
            window.location.href = '/admin'
          }else if(this.nomProfil==='Responsable daara'){
            this.router.navigate(['/admin']);
          }
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
