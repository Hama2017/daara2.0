import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { DataProfilService } from '../../services/data-profil.service';  // Adaptez le chemin à votre structure de projet
import { Profil } from 'src/app/models/profil';  // Adaptez le chemin à votre structure de projet

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  profils: any; // Adapter le type selon votre modèle de données
  profil = new Profil();
  profilForm: FormGroup;

  constructor(private dataProfilService: DataProfilService, private fb: FormBuilder) {
    this.profilForm = this.fb.group({
      nomProfil: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getDataProfil();
  }

  getDataProfil(): void {
    this.dataProfilService.getDataProfil().subscribe(res => {
      this.profils = res;
    });
  }

  insertDataProfil(): void {
    if (this.profilForm.invalid) {
      return;
    }

    this.dataProfilService.insertDataProfil(this.profil).subscribe(res => {
      Swal.fire({
        title: 'Succès',
        text: 'Le profil ' + this.profil.nomProfil + ' a été enregistré avec succès.',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      });
      this.getDataProfil();
      this.profilForm.reset();
    });
  }
}
