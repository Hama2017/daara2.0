// src/app/components/user/user.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DataUserService } from '../../services/data-user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users: User[] = [];
  user = new User();
  userForm: FormGroup;

  constructor(private dataUserService: DataUserService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      nomUser: ['', [Validators.required]],
      prenomUser: ['', [Validators.required]],
      emailUser: ['', [Validators.required, Validators.email]],
      mdpUser: ['', [Validators.required, Validators.minLength(6)]],
      telephoneUser: ['', [Validators.required]],
      idProfil: [0, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getDataUser();
  }

  getDataUser(): void {
    this.dataUserService.getDataUser().subscribe(res => {
      this.users = res;
    });
  }


  deleteDataUser(id: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Voulez-vous vraiment supprimer cet utilisateur ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Non, annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataUserService.deleteDataUser(id).subscribe(res => {
          Swal.fire({
            title: 'Succès',
            text: 'Suppression effectuée avec succès !',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          this.getDataUser();
        });
      }
    });
  }
}
