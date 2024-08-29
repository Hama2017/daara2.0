import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { DataDaarasService } from '../../services/data-daaras.service';
import { Daara } from '../../models/daara';
import { Chart, registerables } from 'chart.js';

import 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
  private map!: L.Map;

  constructor(private http: HttpClient, private daaraService: DataDaarasService) {
    // Enregistrez tous les modules nécessaires pour Chart.js
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.loadCharts();
    this.createPieChart();

  }

  private initMap(): void {
    const senegalCenter: [number, number] = [14.4974, -14.4524];
    this.map = L.map('map').setView(senegalCenter, 7);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
    this.daaraService.getDaaras().subscribe((daaras: Daara[]) => {
      daaras.forEach(daara => {
        const [latitude, longitude] = daara.getCoordonnees();

        const icon = L.divIcon({
          className: 'custom-icon',
          html: `<div style="background-color: blue; width: 20px; height: 20px; border-radius: 50%; border: 2px solid black;"></div>`,
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        });

        L.marker([latitude, longitude])
            .addTo(this.map)
            .bindPopup(`<b style="font-weight: bold">${daara.nomDaara}</b><br>${daara.adresseDaara}<br>${daara.telephoneDaara}<br>${daara.emailDaara}`)
            .openPopup();
      });
    });
    this.http.get('assets/senegal.geojson').subscribe((geojson: any) => {
      const geoJsonLayer = L.geoJSON(geojson, {
        style: {
          color: 'green',
          weight: 1,
          opacity: 1,
          fillOpacity: 0.1
        }
      }).addTo(this.map);

      const bounds = geoJsonLayer.getBounds();
      this.map.fitBounds(bounds);
    });
  }

  private loadCharts(): void {


    // Stacked Bar Chart
    const ctxStackedBar = document.getElementById('chart-bar') as HTMLCanvasElement;
    if (ctxStackedBar) {
      new Chart(ctxStackedBar, {
        type: 'bar',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','May','February','May','July','February','May','July'],
          datasets: [{
            label: 'Garcons',
            data: [65, 59, 80, 81, 56, 55, 40,45,25,75,65,12,17,85],
            backgroundColor: 'rgba(130, 207, 242, 0.3)',
            stack: 'Stack 0'
          }, {
            label: 'Filles',
            data: [28, 48, 40, 19, 86, 27, 90,45,25,75,65,12,17,85],
            backgroundColor: 'rgba(153, 102, 255, 0.5)',
            stack: 'Stack 0'
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              stacked: true
            },
            y: {
              stacked: true
            }
          }
        }
      });
    }
  }
  private createPieChart(): void {
    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Daara Modernisé', 'Daara Traditionnel'],
          datasets: [{
            label: 'Nombre de Daaras',
            data: [45, 55], // Remplacez ces valeurs par vos données réelles
            backgroundColor: [
              'rgba(54, 162, 235, 0.6)', // Couleur pour Daara Modernisé
              'rgba(255, 99, 132, 0.6)'  // Couleur pour Daara Traditionnel
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)', // Couleur de bordure pour Daara Modernisé
              'rgba(255, 99, 132, 1)'  // Couleur de bordure pour Daara Traditionnel
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
            datalabels: {
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
            },
            tooltip: {
              callbacks: {
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
              }
            }
          }
        }
      });
    }
  }
}
