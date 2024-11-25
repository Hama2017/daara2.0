import { Component, OnInit } from '@angular/core';
import { AutheService } from 'src/app/services/authe.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DataUserService } from 'src/app/services/data-user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  user: User | null = null;
  nomProfil: string = '';

  constructor(
    private authService: AutheService,
    private router: Router,
    private userService: DataUserService
  ) {}

  ngOnInit(): void {
    this.user = null;
  }

  onLogin(form: NgForm): void {
    if (form.valid) {
      const credentials = form.value;
      this.authService.login(credentials).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);

          const userId = response.user?.id;
          if (userId) {
            this.userService.getUserData(userId).subscribe({
              next: (user) => {
                this.user = user;

                if (this.user?.idProfil) {
                  localStorage.setItem('user', JSON.stringify(this.user));
                  this.redirectByProfil(this.user.idProfil);
                } else {
                  Swal.fire({
                    title: 'Erreur!',
                    text: 'Profil utilisateur invalide.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                  });
                }
              },
              error: () => {
                Swal.fire({
                  title: 'Erreur!',
                  text: 'Impossible de récupérer vos informations utilisateur.',
                  icon: 'error',
                  confirmButtonText: 'OK'
                });
              }
            });
          } else {
            Swal.fire({
              title: 'Erreur!',
              text: 'Connexion réussie, mais impossible de récupérer l\'utilisateur.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        },
        error: () => {
          Swal.fire({
            title: 'Erreur!',
            text: 'Échec de la connexion, veuillez réessayer.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      });
    } else {
      Swal.fire({
        title: 'Formulaire invalide',
        text: 'Veuillez vérifier vos informations de connexion.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
  }

  private redirectByProfil(idProfil: number): void {
    this.userService.getProfilById(idProfil).subscribe({
      next: (profil) => {
        this.nomProfil = profil.nomProfil;

        if (this.nomProfil === 'Admin') {
          this.router.navigate(['/admin']);
          setTimeout(()=>{
            window.location.reload();
          }, 100)
        } else if (this.nomProfil === 'Responsable daara') {
          this.router.navigate(['/admin']);
          setTimeout(()=>{
            window.location.reload();
          }, 100)
        } else {
          Swal.fire({
            title: 'Erreur!',
            text: 'Votre profil ne correspond à aucune redirection.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      },
      error: () => {
        Swal.fire({
          title: 'Erreur!',
          text: 'Impossible de récupérer le profil utilisateur.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }
}
