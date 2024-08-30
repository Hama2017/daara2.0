import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataUserService } from '../../services/data-user.service';
import { User } from 'src/app/models/user';
import { Profil } from 'src/app/models/profil';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup;
  profils: Profil[] = [];
  userId: number;

  constructor(
    private fb: FormBuilder,
    private dataUserService: DataUserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Initialisation du formulaire
    this.userForm = this.fb.group({
      nomUser: ['', [Validators.required]],
      prenomUser: ['', [Validators.required]],
      emailUser: ['', [Validators.required, Validators.email]],
      telephoneUser: ['', Validators.required],
      idProfil: ['', Validators.required],
      mdpUser: ['passer'] 
    });

    // Récupérer l'id de l'utilisateur depuis l'URL
    this.userId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    // Récupérer la liste des profils
    this.dataUserService.getProfils().subscribe(profils => {
      this.profils = profils;
    });

    // Charger les données de l'utilisateur
    this.dataUserService.getUserByID(this.userId).subscribe(user => {
      this.userForm.patchValue(user);
    });
  }

  updateUser(): void {
    if (this.userForm.valid) {
      const updatedUser: User = this.userForm.value;
      // Envoyer les données mises à jour à l'API
      this.dataUserService.updateDataUser(this.userId, updatedUser).subscribe(response => {
        // Afficher une alerte SweetAlert après la modification réussie
        Swal.fire({
          title: 'Succès!',
          text: 'Utilisateur modifié avec succès.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        // Rediriger vers la liste des utilisateurs après la mise à jour
        this.router.navigate(['/admin/user']);
      });
    }
  }
}
