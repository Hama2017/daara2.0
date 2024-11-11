import { Component, OnInit } from '@angular/core';
import { DataNiveauService } from '../../services/data-niveau.service';
import { Niveau } from '../../models/niveau';

@Component({
  selector: 'app-niveau',
  templateUrl: './niveau.component.html',
  styleUrls: ['./niveau.component.scss']
})
export class NiveauComponent implements OnInit {
  niveaux: Niveau[] = [];

  constructor(private dataNiveauService: DataNiveauService) {}

  ngOnInit(): void {
    this.getNiveaux();
  }

  getNiveaux(): void {
    this.dataNiveauService.getNiveaux().subscribe((data) => {
      this.niveaux = data;
    });
  }

  deleteNiveau(id: number): void {
    this.dataNiveauService.deleteNiveau(id).subscribe(() => {
      this.niveaux = this.niveaux.filter((niveau) => niveau.id !== id);
    });
  }
}
