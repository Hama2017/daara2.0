import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
  private map!: L.Map;

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    const senegalCenter: [number, number] = [14.4974, -14.4524];

    this.map = L.map('map').setView(senegalCenter, 7);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
    const ecoles = [
      { name: 'École A', latitude: 15.030631, longitude: -15.046336 },
      { name: 'École B', latitude: 15.354003, longitude: -15.875803 },
      { name: 'École C', latitude: 13.823029, longitude: -12.766673 }

    ];
    // Ajouter des marqueurs pour chaque école
    ecoles.forEach(ecole => {
      L.marker([ecole.latitude, ecole.longitude])
          .addTo(this.map)
          .bindPopup(`<b>${ecole.name}</b>`)
          .openPopup();
    });
    this.http.get('assets/senegal.geojson').subscribe((geojson: any) => {
      // Assurez-vous que l'objet GeoJSON est de type FeatureCollection
      const geojsonData: L.GeoJSON = geojson;

      // Couche pour les contours du Sénégal
      const geoJsonLayer = L.geoJSON(geojson, {
        style: {
          color: 'green', // Couleur des contours
          weight: 1, // Épaisseur des contours
          opacity: 1, // Opacité des contours
          fillOpacity: 0.1 // Pas de couleur de remplissage
        }
      }).addTo(this.map);

      // Obtenir les limites du Sénégal pour centrer la carte
      const bounds = geoJsonLayer.getBounds();
      this.map.fitBounds(bounds);
    });
  }
}
