import {Component, OnInit} from '@angular/core';
import {DataDaarasService} from "../../services/data-daaras.service";
import {Daara} from "../../models/daara";
@Component({
  selector: 'app-liste-daara',
  templateUrl: './liste-daara.component.html',
  styleUrls: ['./liste-daara.component.scss']
})
export class ListeDaaraComponent implements OnInit {
  ngOnInit(): void {
    this.getDaaras();
  }

  daaras: Daara[] = [];

  constructor(private dataDaaraService: DataDaarasService) {
  }

  getDaaras() {
    this.dataDaaraService.getDaaras().subscribe((res: Daara[]) => {
      this.daaras = res;
    });
  }

  selectedDaara: Daara | null = null;

  openDaaraDetails(daara: Daara) {
    this.selectedDaara = daara;
    // @ts-ignore
    $('#daaraDetailsModal').modal('show');
  }
}
