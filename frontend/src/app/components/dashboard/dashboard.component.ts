import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { DataDaarasService } from '../../services/data-daaras.service';
import { Daara } from '../../models/daara';
import { Chart, registerables } from 'chart.js';

import 'chartjs-plugin-datalabels';
import { IA } from 'src/app/models/ia';
import { DataIasService } from 'src/app/services/data-ias.service';
import { ignoreElements } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
  private map!: L.Map;
  daaras: Daara[] = []; // Tous les Daaras
  filteredDaaras: Daara[] = []; // Daaras filtrés par IA
  ias: IA[] = []; // Liste des IA

  constructor(
      private http: HttpClient,
      private daaraService: DataDaarasService,
      private iaService: DataIasService
  ) {
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.loadCharts();
    this.createPieChart();
    this.loadIA(); // Charger les IA
  }

  // Charger les IA depuis le service
  loadIA(): void {
    this.iaService.getIAs().subscribe((ias: IA[]) => {
      this.ias = ias;
    });
  }

  // Filtrer les Daaras par IA lors de la sélection
  onIaChange(event: any): void {
    const selectedIaId = event.target.value;

    if (selectedIaId) {
      // Filtrer les daaras par IA
      this.filteredDaaras = this.daaras.filter(daara => daara.ief.ia_id === +selectedIaId);
      console.log();
    } else {
      // Si aucune IA n'est sélectionnée, afficher tous les daaras
      this.filteredDaaras = [...this.daaras];
    }
    this.updateMap(); // Mettre à jour la carte avec les daaras filtrés
  }

  // Initialiser la carte et charger les daaras
  private initMap(): void {
    const senegalCenter: [number, number] = [14.4974, -14.4524];
    this.map = L.map('map').setView(senegalCenter, 7);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    this.daaraService.getDaaras().subscribe((daaras: Daara[]) => {
      this.daaras = daaras;
      this.filteredDaaras = daaras; // Initialement afficher tous les daaras
      this.updateMap(); // Mettre à jour la carte

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

  // Mettre à jour la carte avec les daaras filtrés
  /*private updateMap(): void {
    // Supprimer tous les marqueurs actuels de la carte
    this.map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer);
      }
    });

    // Ajouter les marqueurs filtrés
    this.filteredDaaras.forEach(daara => {
      const [latitude, longitude] = daara.getCoordonnees();

      const icon = L.divIcon({
        className: 'custom-icon',
        html: `<div style="background-color: blue; width: 20px; height: 20px; border-radius: 50%; border: 2px solid black;"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });

      L.marker([latitude, longitude])
          .addTo(this.map)
          .bindPopup(`<b>${daara.nomDaara}</b><br>${daara.adresseDaara}<br>${daara.ief.nom}`)
          .openPopup();
    });
  }*/
// Mettre à jour la carte avec les daaras filtrés et zoomer sur les marqueurs
private updateMap(): void {
  // Supprimer tous les marqueurs actuels de la carte
  this.map.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      this.map.removeLayer(layer);
    }
  });

  // Initialiser une instance de LatLngBounds pour calculer les limites englobant tous les marqueurs
  const bounds = L.latLngBounds([]);

  // Ajouter les marqueurs filtrés
  this.filteredDaaras.forEach(daara => {
    const [latitude, longitude] = daara.getCoordonnees();

    const icon = L.divIcon({
      className: 'custom-icon',
      html: `<div style="background-color: blue; width: 15px; height: 15px; border-radius: 50%; border: 2px solid black;"></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });

    // Ajouter chaque marqueur à la carte
    const marker = L.marker([latitude, longitude], { icon })
      .addTo(this.map)
      .bindPopup(`<b>${daara.nomDaara}</b><br>${daara.adresseDaara}<br>${daara.ief.nom}`);

    // Ajouter chaque position au LatLngBounds
    bounds.extend([latitude, longitude]);
  });

  // Zoomer et ajuster la vue pour englober tous les marqueurs
  if (this.filteredDaaras.length > 0) {
    this.map.fitBounds(bounds, { padding: [50, 50] });
  }
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
              backgroundColor: '#17a2b8',
              borderColor: '#17a2b8',
              borderWidth: 1
            },
            {
              label: 'Filles',
              data: [8, 14, 7, 11, 6,12, 19, 3, 5, 2,6,7,8,9,], // Remplace par tes données pour le deuxième dataset
              backgroundColor: '#09ad95',
              borderColor: '#09ad95',
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
              '#09ad95',
              '#17a2b8',
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