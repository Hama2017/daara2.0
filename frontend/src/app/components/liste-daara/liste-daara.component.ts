import {Component, OnInit} from '@angular/core';
import {DataDaarasService} from "../../services/data-daaras.service";
import {Daara} from "../../models/daara";
import {Chart} from "chart.js";
@Component({
  selector: 'app-liste-daara',
  templateUrl: './liste-daara.component.html',
  styleUrls: ['./liste-daara.component.scss']
})
export class ListeDaaraComponent implements OnInit {
  ngOnInit(): void {
    this.getDaaras();
    this.createPieChart();
    this.createPieChart2();
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
  private createPieChart(): void {
    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Garcon', 'Fille'],
          datasets: [{
            label: 'Nombre',
            data: [55, 45], // Remplacez ces valeurs par vos données réelles
            backgroundColor: [
              'rgba(54, 162, 235, 0.6)', // Couleur pour garcon
              'rgba(255, 99, 132, 0.6)'  // Couleur pour fille
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position:'top',
            },
            /*datalabels: {
              display: true,
              formatter: (value: number, context: any) => {
                const total = context.chart.getDatasetMeta(0).total;
                const percentage = (value / total * 100).toFixed(2) + '%';
                return percentage;
              },
              color: '#fff',
              anchor: 'end',
              align: 'start',
              offset: 10,
            },*/
            tooltip: {
              enabled:true,
              /*callbacks: {
                label: function (context) {
                  let label = context.label || '';
                  if (context.parsed) {
                    // @ts-ignore
                    const total = context.chart.getDatasetMeta(0).total;
                    const percentage = (context.parsed / total * 100).toFixed(2) + '%';
                    label += `: ${percentage}`;
                  }
                  return label;
                }
              }*/
            }
          }
        }
      });
    }
  }
  private createPieChart2(): void {
    const ctx = document.getElementById('pieChart2') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['5-7 ans', '7-10 ans', '10-15 ans'],
          datasets: [{
            label: 'Nombre',
            data: [30,32,29], // Remplacez ces valeurs par vos données réelles
            backgroundColor: [
              'rgba(120,235,54,0.6)', // Couleur pour garcon
              'rgb(232,46,68)'  ,// Couleur pour fille
              'rgb(118,85,250)'  ,// Couleur pour fille
            ],
            borderColor: [
              'rgba(120,235,54,0.6)', // Couleur pour garcon
              'rgb(232,46,68)'  ,// Couleur pour fille
              'rgb(118,85,250)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position:'top',
            },
            /*datalabels: {
              display: true,
              formatter: (value: number, context: any) => {
                const total = context.chart.getDatasetMeta(0).total;
                const percentage = (value / total * 100).toFixed(2) + '%';
                return percentage;
              },
              color: '#fff',
              anchor: 'end',
              align: 'start',
              offset: 10,
            },*/
            tooltip: {
              enabled:true,
              /*callbacks: {
                label: function (context) {
                  let label = context.label || '';
                  if (context.parsed) {
                    // @ts-ignore
                    const total = context.chart.getDatasetMeta(0).total;
                    const percentage = (context.parsed / total * 100).toFixed(2) + '%';
                    label += `: ${percentage}`;
                  }
                  return label;
                }
              }*/
            }
          }
        }
      });
    }
  }
}
