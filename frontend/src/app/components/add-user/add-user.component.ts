import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataUserService } from '../../services/data-user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Profil } from 'src/app/models/profil';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
  profils: Profil[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dataUserService: DataUserService
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
  }

  ngOnInit(): void {
    // Récupérer la liste des profils
    this.dataUserService.getProfils().subscribe(profils => {
      this.profils = profils;
    });
  }

  insertUser(): void {
    if (this.userForm.valid) {
      const newUser: User = this.userForm.value;
      // Envoyer les données à l'API pour insertion
      this.dataUserService.insertDataUser(newUser).subscribe(response => {
        // Afficher une alerte SweetAlert après l'ajout réussi
        Swal.fire({
          title: 'Succès!',
          text: 'Utilisateur ajouté avec succès.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.router.navigate(['/admin/user']);
      });
    }
  }
}
