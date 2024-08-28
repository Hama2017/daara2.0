import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { DataProfilService } from '../../services/data-profil.service';
import { Profil } from 'src/app/models/profil';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.scss']
})
export class EditProfilComponent implements OnInit {
  id: any;
  profil = new Profil();
  profilForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private dataProfilService: DataProfilService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.profilForm = this.fb.group({
      nomProfil: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getDataProfil();
  }

  getDataProfil(): void {
    this.dataProfilService.getProfilByID(this.id).subscribe(res => {
      this.profil = res as Profil; 
      this.profilForm.patchValue({
        nomProfil: this.profil.nomProfil
      });
    });
  }

  updateDataProfil(): void {
    if (this.profilForm.invalid) {
      return;
    }

    this.dataProfilService.updateDataProfil(this.id, this.profilForm.value).subscribe(res => {
      Swal.fire({
        title: 'Succès',
        text: 'Le profil ' + this.profil.nomProfil + ' a été mis à jour avec succès.',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/admin/profil']);
    });
  }
}
