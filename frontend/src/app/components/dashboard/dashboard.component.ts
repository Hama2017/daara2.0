import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {HttpClient} from "@angular/common/http";
import {DataDaarasService} from "../../services/data-daaras.service";
import {Daara} from "../../models/daara";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
  private map!: L.Map;

  constructor(private http: HttpClient,private  daaraService:DataDaarasService) {}

  ngAfterViewInit(): void {
    const senegalCenter: [number, number] = [14.4974, -14.4524];
    this.map = L.map('map').setView(senegalCenter, 7);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
    this.daaraService.getDaaras().subscribe((daaras: Daara[]) => {
      daaras.forEach(daara => {
        const [latitude, longitude] = daara.getCoordonnees(); // Obtenir les coordonnées

        // Créer une icône personnalisée (optionnel)
        const icon = L.divIcon({
          className: 'custom-icon',
          html: `<div style="background-color: blue; width: 20px; height: 20px; border-radius: 50%; border: 2px solid black;"></div>`,
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        });

        // Ajouter un marqueur pour chaque école
        L.marker([latitude, longitude], )
            .addTo(this.map)
            .bindPopup(`<b style="font-weight: bold">${daara.nomDaara}</b><br>${daara.adresseDaara}<br>${daara.telephoneDaara}<br>${daara.emailDaara}`)
            .openPopup();
      });
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
