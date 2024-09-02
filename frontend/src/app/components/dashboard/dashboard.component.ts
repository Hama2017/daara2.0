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


    // Bar Chart2
    const ctxBar2 = document.getElementById('chartBar2') as HTMLCanvasElement;
    if (ctxBar2) {
      new Chart(ctxBar2, {
        type: 'bar',
        data: {
          labels: ['Dakar', 'Thies', 'Diourbel', 'Saint-Louis', 'Tambacounda', 'Kaolack', 'Kolda', 'Ziguinchor', 'Louga', 'Fatick', 'Matam', 'Kaffrine', 'Kedougou', 'Sedhiou'],
          datasets: [
            {
              label: 'Garçons',
              data: [12, 19, 3, 5, 2,6,7,8,9,10,11,12,13,14],
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            },
            {
              label: 'Filles',
              data: [8, 14, 7, 11, 6,12, 19, 3, 5, 2,6,7,8,9,], // Remplace par tes données pour le deuxième dataset
              backgroundColor: 'rgba(255, 99, 132, 0.6)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          },
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              enabled: true,
            }
          }
        }
      });
    }
  }

  private createPieChart(): void {
    const ctxDonut = document.getElementById('chartDonut') as HTMLCanvasElement;
    if (ctxDonut) {
      new Chart(ctxDonut, {
        type: 'pie',
        data: {
          labels: ['Moderne', 'Traditionnel'], // Remplace par tes labels
          datasets: [{
            label: 'Nombre de daara',
            data: [15, 5], // Remplace par tes données
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
            ],
            hoverOffset: 20
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              enabled: true,
            }
          }
        }
      });
    }
  }
}