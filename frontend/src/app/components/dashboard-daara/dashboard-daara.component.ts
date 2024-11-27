import { Component,OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard-daara',
  templateUrl: './dashboard-daara.component.html',
  styleUrls: ['./dashboard-daara.component.scss']
})
export class DashboardDaaraComponent implements OnInit {
  ngOnInit(): void {
    this.createPieChart();
    this.createPieChart2();
  }
  private createPieChart(): void {
    const ctx = document.getElementById('chart1') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Garcon', 'Fille'],
          datasets: [{
            label: 'Nombre',
            data: [55, 45], // Remplacez ces valeurs par vos données réelles
            backgroundColor: [
              '#17a2b8', // Couleur pour garcon
              '#09ad95'  // Couleur pour fille
            ],
            borderColor: [
              '#17a2b8',
              '#09ad95'
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
    const ctx = document.getElementById('chart2') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['5-7 ans', '7-10 ans', '10-15 ans'],
          datasets: [{
            label: 'Nombre',
            data: [30,32,29], // Remplacez ces valeurs par vos données réelles
            backgroundColor: [
              '#09ad95', // Couleur pour garcon
              '#04BBFF'  ,// Couleur pour fille
              '#17a2b8'  ,// Couleur pour fille
            ],
            borderColor: [
              '#09ad95', // Couleur pour garcon
              '#04BBFF'  ,// Couleur pour fille
              '#17a2b8'
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
